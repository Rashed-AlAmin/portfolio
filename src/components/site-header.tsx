"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Command as CommandIcon, Menu, Moon, Sun } from "lucide-react";
import { navItems, profile } from "@/content/profile";
import { openCommandMenu } from "@/components/command-menu-loader";
import { cn } from "@/lib/utils";

const subscribeNoop = () => () => {};

function useMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

/** The last section whose top has scrolled past 40% of the viewport, or null while in the hero. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.4;
        let current: string | null = null;
        for (const { id } of navItems) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        // At the very bottom, the last section wins even if it's short.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          current = navItems[navItems.length - 1].id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return active;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const mounted = useMounted();
  const isMac = mounted && /mac|iphone|ipad/i.test(navigator.userAgent);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "border-border bg-card-solid/75 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="group flex items-center gap-2 pl-1 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-fg font-mono text-xs text-bg transition-transform group-hover:rotate-[-8deg]">
            RA
          </span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  active === item.id ? "bg-fg/[0.07] text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg sm:flex"
            aria-label="Open command menu"
          >
            <CommandIcon className="size-3.5" aria-hidden />
            <kbd className="font-mono">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={openCommandMenu}
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-fg/[0.06] hover:text-fg md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-4" aria-hidden />
          </button>
        </div>
      </nav>
    </header>
  );
}
