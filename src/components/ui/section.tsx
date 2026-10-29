import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-16 sm:py-24", className)}>
      <Reveal className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-pretty text-muted sm:text-lg">{description}</p>}
      </Reveal>
      {children}
    </section>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-fg/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
