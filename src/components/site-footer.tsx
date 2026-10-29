import { cacheLife } from "next/cache";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon } from "@/components/icons";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-subtle sm:flex-row sm:px-8">
        <p>
          © <CurrentYear /> {profile.name}. Built with Next.js, deployed on Vercel.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.sourceRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-fg/[0.05] hover:text-fg"
          >
            <GitHubIcon size={14} /> Source
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-fg/[0.05] hover:text-fg"
          >
            Back to top <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
