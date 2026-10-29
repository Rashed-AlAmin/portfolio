import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/profile";
import { GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Chip, Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** Generative "browser window" preview — no screenshots needed, always on-brand. */
function Preview({ project }: { project: Project }) {
  const h = project.hue;
  return (
    <div
      className="relative h-full min-h-56 overflow-hidden rounded-2xl border border-border"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, oklch(0.72 0.14 ${h} / 0.45), transparent 60%),
          radial-gradient(90% 80% at 100% 100%, oklch(0.65 0.15 ${h + 60} / 0.35), transparent 60%),
          var(--card-solid)`,
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-card-solid/60 px-4 py-3 backdrop-blur">
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="ml-3 truncate rounded-md bg-fg/[0.05] px-3 py-1 font-mono text-[11px] text-subtle">
          {project.live ? hostname(project.live) : "localhost:3000"}
        </span>
      </div>
      <div className="bg-grid absolute inset-0 top-11 opacity-60 mask-fade-b" aria-hidden />
      <div className="relative flex h-[calc(100%-2.75rem)] flex-col justify-end p-6">
        <p
          className="font-serif text-5xl leading-none italic sm:text-6xl"
          style={{ color: `oklch(0.8 0.12 ${h})` }}
        >
          {project.name}
        </p>
        <p className="mt-3 font-mono text-xs tracking-wider text-muted uppercase">{project.tagline}</p>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Things I&apos;ve built and <span className="font-serif font-normal italic text-gradient">shipped.</span>
        </>
      }
      description="Live products, not tutorials — each one deployed and running."
    >
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.name}>
            <SpotlightCard hue={project.hue} className="p-3 sm:p-4">
              <div className={cn("grid gap-6 md:grid-cols-2", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
                <Preview project={project} />
                <div className="flex flex-col p-3 sm:p-5">
                  <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h3>
                  <p className="text-accent">{project.tagline}</p>
                  <p className="mt-4 text-pretty text-muted">{project.description}</p>
                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full"
                          style={{ background: `oklch(0.75 0.14 ${project.hue})` }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
                      >
                        Live site
                        <ArrowUpRight
                          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                        <span className="sr-only">for {project.name} (opens in new tab)</span>
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-accent/50"
                      >
                        <GitHubIcon size={16} /> Source
                        <span className="sr-only">code for {project.name} (opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
