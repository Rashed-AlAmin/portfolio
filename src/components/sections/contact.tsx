import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { socialIcons } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Contact() {
  const formEnabled = Boolean(process.env.RESEND_API_KEY);

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">Contact</p>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal italic text-gradient">great together.</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted sm:text-lg">
            Hiring for a full-stack role, need a Shopify app, or want an LLM feature that actually ships? My inbox
            is open.
          </p>

          <ul className="mt-10 space-y-3">
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-fg/[0.03]">
                <Mail className="size-4 text-accent" aria-hidden />
              </span>
              <a href={`mailto:${profile.email}`} className="truncate hover:underline hover:underline-offset-4">
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-fg/[0.03]">
                <Phone className="size-4 text-accent" aria-hidden />
              </span>
              <a href={`tel:${profile.phone}`} className="hover:underline hover:underline-offset-4">
                {profile.phone.replace(/^(\+880)(\d{4})(\d+)$/, "$1 $2-$3")}
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-fg/[0.03]">
                <MapPin className="size-4 text-accent" aria-hidden />
              </span>
              {profile.location}
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-2">
            {Object.entries(profile.socials).map(([key, s]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons];
              return (
                <a
                  key={key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  <Icon size={15} /> {s.label}
                  <ArrowUpRight className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SpotlightCard className="p-6 sm:p-8">
            <ContactForm enabled={formEnabled} />
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
