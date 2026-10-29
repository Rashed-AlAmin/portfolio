"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-border bg-fg/[0.02] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/60 focus:bg-fg/[0.04] aria-[invalid=true]:border-red-400/70";

/**
 * When `enabled` is false (no email provider configured), submitting opens the
 * visitor's mail app with the message pre-filled, so the form always works.
 */
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    async (prev, formData) => {
      if (enabled) return sendContactMessage(prev, formData);
      const name = String(formData.get("name") ?? "");
      const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
      const body = encodeURIComponent(String(formData.get("message") ?? ""));
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return { status: "idle" };
    },
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center text-center" role="status">
        <CircleCheck className="size-10 text-emerald-400" aria-hidden />
        <p className="mt-4 text-lg font-medium">Message sent</p>
        <p className="mt-1 max-w-xs text-sm text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate={enabled}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={fieldClass}
          />
          {state.errors?.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@company.com"
            aria-invalid={!!state.errors?.email}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={fieldClass}
          />
          {state.errors?.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, role or idea…"
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={cn(fieldClass, "resize-none")}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {state.errors.message}
          </p>
        )}
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-subtle" aria-live="polite">
          {state.status === "error" ? <span className="text-red-400">{state.message}</span> : null}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
