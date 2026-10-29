import Image from "next/image";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { socialIcons } from "@/components/icons";
import { RoleRotator } from "@/components/role-rotator";

const stack = [
  "TypeScript", "React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "GraphQL",
  "Prisma", "Redis", "Docker", "Shopify", "Tailwind CSS", "MongoDB", "LLM APIs",
];

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-4 sm:pt-44">
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="order-2 lg:order-1">
          <div className="animate-rise">
            <a
              href="#contact"
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pr-4 pl-3 text-xs text-muted backdrop-blur transition-colors hover:text-fg"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </a>
          </div>

          <div className="animate-rise [animation-delay:60ms]">
            <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              Hi, I&apos;m {profile.shortName}.
              <br />
              I build products{" "}
              <span className="font-serif text-[1.08em] font-normal italic text-gradient">end to end.</span>
            </h1>
          </div>

          <div className="animate-rise [animation-delay:120ms]">
            <p className="mt-6 text-lg text-muted sm:text-xl">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" aria-hidden /> Dhaka
              </span>
              <span className="mx-2.5 text-subtle">·</span>
              <RoleRotator roles={profile.roles} />
            </p>
            <p className="mt-4 max-w-xl text-pretty text-muted sm:text-lg">{profile.headline}</p>
          </div>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:180ms]">
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium backdrop-blur transition-colors hover:border-accent/50"
            >
              <Download className="size-4" aria-hidden /> Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              {(["github", "linkedin"] as const).map((key) => {
                const Icon = socialIcons[key];
                const s = profile.socials[key];
                return (
                  <a
                    key={key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
                  >
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-2">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] bg-[conic-gradient(from_180deg,var(--accent),var(--accent-2),var(--accent))] opacity-25 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-2xl shadow-black/20">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={640}
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 360px, 300px"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-[50%_20%]"
              />
            </div>
            <div className="card absolute -bottom-5 -left-4 flex bg-card-solid/90 items-center gap-3 px-4 py-3 shadow-xl sm:-left-10">
              <span className="grid size-9 place-items-center rounded-xl bg-accent/15 font-mono text-xs font-semibold text-accent">
                {"</>"}
              </span>
              <div className="text-xs leading-tight">
                <p className="font-medium">Currently @ Webozza</p>
                <p className="text-subtle">Shopify + AI agents</p>
              </div>
            </div>
            <div className="card absolute -top-4 -right-3 bg-card-solid/90 px-4 py-2.5 text-xs shadow-xl sm:-right-8">
              <p className="font-mono text-lg leading-none font-semibold text-gradient">300+</p>
              <p className="mt-1 text-subtle">problems solved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mask-fade-x mt-20 overflow-hidden sm:mt-24" aria-label="Technologies I work with">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...stack, ...stack].map((tech, i) => (
            <li
              key={i}
              aria-hidden={i >= stack.length}
              className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs whitespace-nowrap text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
