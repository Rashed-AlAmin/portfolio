"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check className="size-4 text-emerald-400" aria-hidden /> : <Copy className="size-4" aria-hidden />}
    </button>
  );
}
