import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[80dvh] max-w-5xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page took a <span className="font-serif font-normal italic text-gradient">wrong turn.</span>
      </h1>
      <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back home
      </Link>
    </main>
  );
}
