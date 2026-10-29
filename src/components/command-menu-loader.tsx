"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export const OPEN_COMMAND_MENU = "open-command-menu";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
}

const CommandMenu = dynamic(() => import("./command-menu").then((m) => m.CommandMenu), { ssr: false });

/**
 * Keeps cmdk + its dialog out of the initial bundle: the real menu is only
 * downloaded the first time someone presses ⌘K / Ctrl K or taps the menu button.
 */
export function CommandMenuLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        load();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, load);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, load);
    };
  }, [loaded]);

  return loaded ? <CommandMenu defaultOpen /> : null;
}
