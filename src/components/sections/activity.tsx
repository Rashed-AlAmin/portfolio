import { Suspense } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { profile } from "@/content/profile";
import { getContributions, getGitHubOverview, type Contributions } from "@/lib/github";
import { getCodeforcesStats, getLeetCodeStats } from "@/lib/competitive";
import { CodeforcesIcon, GitHubIcon, LeetCodeIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { compactNumber } from "@/lib/utils";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-fg/[0.06] ${className ?? ""}`} />;
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
    >
      {label} <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  );
}

/* ---------------------------- Contribution graph ---------------------------- */

function ContributionGraph({ data }: { data: Contributions }) {
  // Pad the start so the first column begins on Sunday, then chunk into weeks.
  const firstDay = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Contributions["days"][number] | null)[] = [...Array(firstDay).fill(null), ...data.days];
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="overflow-x-auto pb-1 [scrollbar-width:thin]">
      <div
        className="flex min-w-[640px] gap-[3px]"
        role="img"
        aria-label={`${data.total} GitHub contributions in the last year`}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-1 flex-col gap-[3px]">
            {week.map((day, di) =>
              day ? (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className="aspect-square w-full rounded-[3px]"
                  style={{ background: `var(--heat-${day.level})` }}
                />
              ) : (
                <span key={`pad-${di}`} className="aspect-square w-full" />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

async function GitHubPanel() {
  const [overview, contributions] = await Promise.all([getGitHubOverview(), getContributions()]);

  const stats = [
    { label: "Contributions (1y)", value: contributions ? compactNumber(contributions.total) : "—" },
    { label: "Public repos", value: overview ? overview.publicRepos : "—" },
    { label: "Stars earned", value: overview ? overview.totalStars : "—" },
    { label: "Followers", value: overview ? overview.followers : "—" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card-solid p-5">
            <p className="font-mono text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {contributions ? (
          <>
            <ContributionGraph data={contributions} />
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-subtle">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="size-[10px] rounded-[3px]" style={{ background: `var(--heat-${l})` }} />
              ))}
              More
            </div>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-subtle">
            Contribution graph is taking a breather —{" "}
            <a className="underline underline-offset-4" href={profile.socials.github.url}>
              see it on GitHub
            </a>
            .
          </p>
        )}
      </div>

      {overview && overview.topLanguages.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {overview.topLanguages.map((l) => (
            <span key={l.name} className="inline-flex items-center gap-2 text-sm text-muted">
              <span
                className="size-2.5 rounded-full"
                style={{ background: languageColors[l.name] ?? "var(--subtle)" }}
              />
              {l.name}
            </span>
          ))}
        </div>
      )}

      {overview && overview.repos.length > 0 && (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {overview.repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-fg/[0.02] p-4 transition-colors hover:border-accent/40"
              >
                <span className="flex items-center justify-between gap-2 font-mono text-sm font-medium">
                  <span className="truncate">{repo.name}</span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </span>
                <span className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                  {repo.description ?? "No description yet."}
                </span>
                <span className="mt-4 flex items-center gap-4 text-xs text-subtle">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="size-2 rounded-full"
                        style={{ background: languageColors[repo.language] ?? "var(--subtle)" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3.5" aria-hidden /> {repo.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3.5" aria-hidden /> {repo.forks}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function GitHubPanelSkeleton() {
  return (
    <>
      <Skeleton className="h-[86px]" />
      <Skeleton className="mt-6 h-[100px]" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    </>
  );
}

/* ---------------------------- Competitive programming ---------------------------- */

/** Shown when a platform's API is unreachable — keeps the card meaningful instead of empty. */
function StatsFallback({ href }: { href: string }) {
  return (
    <div className="mt-6">
      <p className="font-mono text-3xl font-semibold">
        300+
        <span className="ml-2 font-sans text-xs font-normal text-subtle">problems solved across platforms</span>
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        See live stats on the profile <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}

const cfRankColor: Record<string, string> = {
  newbie: "#9ca3af",
  pupil: "#22c55e",
  specialist: "#14b8a6",
  expert: "#3b82f6",
  "candidate master": "#a855f7",
  master: "#f59e0b",
  "international master": "#f59e0b",
  grandmaster: "#ef4444",
};

async function CodeforcesCard() {
  const cf = await getCodeforcesStats();
  const rankColor = cf?.rank ? (cfRankColor[cf.rank] ?? "var(--accent)") : "var(--accent)";
  return (
    <>
      {cf ? (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <p className="font-mono text-3xl font-semibold" style={{ color: rankColor }}>
              {cf.rating ?? "—"}
            </p>
            <p className="mt-1 text-xs text-subtle">Rating</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-semibold">{cf.maxRating ?? "—"}</p>
            <p className="mt-1 text-xs text-subtle">Max rating</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-semibold">{cf.solved || "—"}</p>
            <p className="mt-1 text-xs text-subtle">Solved</p>
          </div>
          {cf.rank && (
            <p className="col-span-3 text-sm capitalize" style={{ color: rankColor }}>
              {cf.rank}
            </p>
          )}
        </div>
      ) : (
        <StatsFallback href={profile.socials.codeforces.url} />
      )}
    </>
  );
}

async function LeetCodeCard() {
  const lc = await getLeetCodeStats();
  if (!lc) {
    return <StatsFallback href={profile.socials.leetcode.url} />;
  }
  const bars = [
    { label: "Easy", value: lc.easy, color: "#22c55e" },
    { label: "Medium", value: lc.medium, color: "#f59e0b" },
    { label: "Hard", value: lc.hard, color: "#ef4444" },
  ];
  return (
    <div className="mt-6">
      <p className="font-mono text-3xl font-semibold">
        {lc.total}
        <span className="ml-2 font-sans text-xs font-normal text-subtle">problems solved</span>
      </p>
      <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-fg/[0.06]">
        {bars.map((b) => (
          <span key={b.label} style={{ width: `${(b.value / Math.max(lc.total, 1)) * 100}%`, background: b.color }} />
        ))}
      </div>
      <div className="mt-3 flex gap-5 text-xs text-muted">
        {bars.map((b) => (
          <span key={b.label} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: b.color }} />
            {b.label} <span className="font-mono text-fg">{b.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Section ---------------------------- */

export function Activity() {
  return (
    <Section
      id="activity"
      eyebrow="Live activity"
      title={
        <>
          Still writing code <span className="font-serif font-normal italic text-gradient">every week.</span>
        </>
      }
      description="Pulled live from GitHub, Codeforces and LeetCode, refreshed automatically every hour."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal className="min-w-0 lg:col-span-2">
          <SpotlightCard className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <GitHubIcon size={22} />
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="font-mono text-xs text-subtle">@{profile.socials.github.handle}</p>
                </div>
              </div>
              <ProfileLink href={profile.socials.github.url} label="Profile" />
            </div>
            <Suspense fallback={<GitHubPanelSkeleton />}>
              <GitHubPanel />
            </Suspense>
          </SpotlightCard>
        </Reveal>

        <Reveal className="min-w-0">
          <SpotlightCard className="h-full p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CodeforcesIcon size={20} className="text-accent" />
                <div>
                  <h3 className="font-semibold">Codeforces</h3>
                  <p className="font-mono text-xs text-subtle">@{profile.socials.codeforces.handle}</p>
                </div>
              </div>
              <ProfileLink href={profile.socials.codeforces.url} label="Profile" />
            </div>
            <Suspense fallback={<Skeleton className="mt-6 h-20" />}>
              <CodeforcesCard />
            </Suspense>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.05} className="min-w-0">
          <SpotlightCard className="h-full p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LeetCodeIcon size={20} className="text-accent-2" />
                <div>
                  <h3 className="font-semibold">LeetCode</h3>
                  <p className="font-mono text-xs text-subtle">@{profile.socials.leetcode.handle}</p>
                </div>
              </div>
              <ProfileLink href={profile.socials.leetcode.url} label="Profile" />
            </div>
            <Suspense fallback={<Skeleton className="mt-6 h-20" />}>
              <LeetCodeCard />
            </Suspense>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
