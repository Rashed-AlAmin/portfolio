import { Award, BrainCircuit, Clock, GraduationCap, Trophy, Users } from "lucide-react";
import { achievements, education, profile } from "@/content/profile";
import { LocalTime } from "@/components/local-time";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const achievementIcons = { trophy: Trophy, users: Users, award: Award } as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer who cares about the{" "}
          <span className="font-serif font-normal italic text-gradient">whole product.</span>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <SpotlightCard className="h-full p-7 sm:p-8">
            <p className="text-lg leading-relaxed text-pretty sm:text-xl">{profile.summary}</p>
            <p className="mt-5 leading-relaxed text-pretty text-muted">
              I like owning problems from the first whiteboard sketch to the production dashboard: designing the
              data model, building typed APIs, crafting the interface and wiring up the deployment. Lately
              I&apos;ve been focused on bringing LLMs into real commerce workflows.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm text-accent">
              <BrainCircuit className="size-4" aria-hidden />
              Now building: an AI agent for automated storefront analysis
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.05}>
          <SpotlightCard className="flex h-full flex-col justify-between p-7">
            <Clock className="size-5 text-accent" aria-hidden />
            <div className="mt-8">
              <p className="font-mono text-4xl font-semibold tracking-tight">
                <LocalTime />
              </p>
              <p className="mt-2 text-sm text-muted">Local time in {profile.location}</p>
              <p className="mt-1 text-xs text-subtle">UTC+6 · Bangladesh Standard Time</p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.05}>
          <SpotlightCard className="h-full p-7">
            <div className="flex items-start justify-between gap-4">
              <GraduationCap className="size-5 text-accent" aria-hidden />
              <span className="font-mono text-xs text-subtle">{education.graduated}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">{education.school}</h3>
            <p className="mt-1 text-muted">{education.degree}</p>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="font-mono text-xs tracking-wider text-subtle uppercase">Thesis</p>
                <p className="mt-1 text-sm text-pretty text-muted">{education.thesis}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-2xl font-semibold text-gradient">3.46</p>
                <p className="text-xs text-subtle">CGPA / 4.00</p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.1}>
          <SpotlightCard className="h-full p-7">
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">Beyond the day job</p>
            <ul className="mt-5 space-y-5">
              {achievements.map((a) => {
                const Icon = achievementIcons[a.icon];
                const body = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-fg/[0.03]">
                      <Icon className="size-4 text-accent-2" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-medium">{a.title}</span>
                      <span className="block text-sm text-muted">{a.detail}</span>
                    </span>
                  </>
                );
                return (
                  <li key={a.title}>
                    {"href" in a ? (
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 transition-opacity hover:opacity-80"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
