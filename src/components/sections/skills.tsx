import { Bot, Code2, Database, Languages, Layers, Server } from "lucide-react";
import { skills, type SkillIcon } from "@/content/profile";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons: Record<SkillIcon, typeof Code2> = {
  code: Code2,
  layers: Layers,
  server: Server,
  database: Database,
  bot: Bot,
  languages: Languages,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbox"
      title="The stack I reach for."
      description="Typed end to end, boring where it should be, and cutting-edge where it pays off."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.group} delay={(i % 3) * 0.05}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-fg/[0.03]">
                    <Icon className="size-4 text-accent" aria-hidden />
                  </span>
                  <h3 className="font-semibold">{group.group}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-fg/[0.02] px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
