import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { profile } from "@/content/profile";
import { fetchJson } from "@/lib/utils";

const USER = profile.socials.github.handle;

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rashed-portfolio",
  };
  // Optional: raises the rate limit from 60 to 5,000 requests/hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics?: string[];
};

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
};

export type GitHubOverview = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  repos: Repo[];
};

export async function getGitHubOverview(): Promise<GitHubOverview | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("github");

  const [user, repos] = await Promise.all([
    fetchJson<GitHubUser>(`https://api.github.com/users/${USER}`, { headers: githubHeaders() }),
    fetchJson<GitHubRepo[]>(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed&type=owner`,
      { headers: githubHeaders() },
    ),
  ]);

  if (!user || !Array.isArray(repos)) return null;

  const own = repos.filter((r) => !r.fork && !r.archived && r.name !== USER);
  const langCounts = new Map<string, number>();
  for (const r of own) {
    if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  }

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
    topLanguages: [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    repos: own.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
    })),
  };
}

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
};

export type Contributions = {
  total: number;
  days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
};

/** Last-year contribution calendar (public GitHub data via github-contributions-api). */
export async function getContributions(): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("github");

  const data = await fetchJson<ContributionsResponse>(
    `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
  );
  if (!data || !Array.isArray(data.contributions) || data.contributions.length === 0) return null;

  return {
    total: data.total?.lastYear ?? data.contributions.reduce((s, d) => s + d.count, 0),
    days: data.contributions,
  };
}
