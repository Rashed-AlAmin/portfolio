"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** OKLCH hue for the glow; defaults to the site accent. */
  hue?: number;
};

/** Card with a soft radial glow that follows the pointer. Pure CSS vars — no re-renders. */
export function SpotlightCard({ className, hue, style, children, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  const glow = hue === undefined ? "var(--accent)" : `oklch(0.75 0.14 ${hue})`;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "card group/spot relative overflow-hidden transition-colors duration-300 hover:border-[color-mix(in_oklch,var(--glow)_45%,transparent)]",
        className,
      )}
      style={{ ...style, ["--glow" as string]: glow }}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--glow) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
