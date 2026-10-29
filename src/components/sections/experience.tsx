import { experience } from "@/content/profile";
import { Reveal } from "@/components/ui/reveal";
import { Chip, Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been shipping."
      description="Production work across e-commerce, Shopify and AI — owning features from schema to storefront."
    >
      <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-accent before:via-border before:to-transparent sm:before:left-[9px]">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pl-8 sm:pl-12">
            <span
              aria-hidden
              className="absolute top-8 left-0 grid size-[15px] place-items-center rounded-full border border-accent/60 bg-bg sm:size-[19px]"
            >
              <span className={job.current ? "size-[7px] rounded-full bg-accent" : "size-[7px] rounded-full bg-subtle"} />
            </span>
            <Reveal delay={i * 0.05}>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {job.title} <span className="text-muted">@ {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-subtle">
                    {job.period}
                    {job.current && (
                      <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-500 dark:text-emerald-300">
                        now
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-1 text-sm text-subtle">{job.location}</p>
                <p className="mt-4 text-pretty text-muted">{job.summary}</p>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-pretty sm:text-[15px]">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
