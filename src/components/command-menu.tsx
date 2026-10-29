"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Check,
  Copy,
  FileText,
  Mail,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { navItems, profile } from "@/content/profile";
import { socialIcons } from "@/components/icons";
import { OPEN_COMMAND_MENU } from "@/components/command-menu-loader";

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted outline-none transition-colors data-[selected=true]:bg-fg/[0.06] data-[selected=true]:text-fg";
const groupClass =
  "px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-subtle [&_[cmdk-group-heading]]:uppercase";

export function CommandMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  function goTo(id: string) {
    run(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 900);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      loop
      overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      contentClassName="fixed top-[12vh] left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card-solid shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 text-subtle" aria-hidden />
        <Command.Input
          placeholder="Where to? Type a command or search…"
          className="h-13 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
        />
        <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle">
          ESC
        </kbd>
      </div>
      <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain py-1">
        <Command.Empty className="py-10 text-center text-sm text-subtle">No results found.</Command.Empty>

        <Command.Group heading="Navigate" className={groupClass}>
          <Command.Item value="home top" onSelect={() => goTo("top")} className={itemClass}>
            <ArrowRight className="size-4" aria-hidden /> Home
          </Command.Item>
          {navItems.map((item) => (
            <Command.Item key={item.id} onSelect={() => goTo(item.id)} className={itemClass}>
              <ArrowRight className="size-4" aria-hidden /> {item.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Contact" className={groupClass}>
          <Command.Item value="copy email address" onSelect={copyEmail} className={itemClass}>
            {copied ? <Check className="size-4 text-accent" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copied!" : "Copy email address"}
          </Command.Item>
          <Command.Item
            value="send email"
            onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}
            className={itemClass}
          >
            <Mail className="size-4" aria-hidden /> Send an email
          </Command.Item>
          <Command.Item
            value="download cv resume"
            onSelect={() => run(() => window.open(profile.cv, "_blank", "noopener"))}
            className={itemClass}
          >
            <FileText className="size-4" aria-hidden /> Download CV
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Profiles" className={groupClass}>
          {Object.entries(profile.socials).map(([key, s]) => {
            const Icon = socialIcons[key as keyof typeof socialIcons];
            return (
              <Command.Item
                key={key}
                value={`${s.label} ${s.handle}`}
                onSelect={() => run(() => window.open(s.url, "_blank", "noopener"))}
                className={itemClass}
              >
                <Icon size={16} /> {s.label}
                <span className="ml-auto font-mono text-xs text-subtle">@{s.handle}</span>
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Group heading="Theme" className={groupClass}>
          <Command.Item value="theme light" onSelect={() => run(() => setTheme("light"))} className={itemClass}>
            <Sun className="size-4" aria-hidden /> Light
          </Command.Item>
          <Command.Item value="theme dark" onSelect={() => run(() => setTheme("dark"))} className={itemClass}>
            <Moon className="size-4" aria-hidden /> Dark
          </Command.Item>
          <Command.Item value="theme system" onSelect={() => run(() => setTheme("system"))} className={itemClass}>
            <Monitor className="size-4" aria-hidden /> System
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
