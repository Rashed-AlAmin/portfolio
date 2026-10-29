import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { profile } from "@/content/profile";
import { fetchJson } from "@/lib/utils";

export type CodeforcesStats = {
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  solved: number;
};

type CfUserInfo = {
  status: "OK" | "FAILED";
  result?: { rating?: number; maxRating?: number; rank?: string }[];
};

type CfStatus = {
  status: "OK" | "FAILED";
  result?: { verdict?: string; problem: { contestId?: number; problemsetName?: string; index: string } }[];
};

export async function getCodeforcesStats(): Promise<CodeforcesStats | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("competitive");

  const handle = profile.socials.codeforces.handle;
  const [info, status] = await Promise.all([
    fetchJson<CfUserInfo>(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetchJson<CfStatus>(`https://codeforces.com/api/user.status?handle=${handle}`, {
      timeoutMs: 8000,
    }),
  ]);

  if (info?.status !== "OK" || !info.result?.[0]) return null;
  const user = info.result[0];

  const solved = new Set<string>();
  if (status?.status === "OK") {
    for (const s of status.result ?? []) {
      if (s.verdict === "OK") {
        solved.add(`${s.problem.contestId ?? s.problem.problemsetName}-${s.problem.index}`);
      }
    }
  }

  return {
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    rank: user.rank ?? null,
    solved: solved.size,
  };
}

export type LeetCodeStats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

type LcResponse = {
  data?: {
    matchedUser?: {
      submitStatsGlobal?: { acSubmissionNum: { difficulty: string; count: number }[] };
    } | null;
  };
};

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("competitive");

  const data = await fetchJson<LcResponse>("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (compatible; rashed-portfolio)",
    },
    body: JSON.stringify({
      query: `query userStats($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
      }`,
      variables: { username: profile.socials.leetcode.handle },
    }),
  });

  const nums = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!nums) return null;
  const get = (d: string) => nums.find((n) => n.difficulty === d)?.count ?? 0;

  return { total: get("All"), easy: get("Easy"), medium: get("Medium"), hard: get("Hard") };
}
