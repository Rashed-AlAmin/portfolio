import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fetch JSON with a hard timeout. Returns null on any failure so callers can fall back. */
export async function fetchJson<T>(url: string, init?: RequestInit & { timeoutMs?: number }) {
  const { timeoutMs = 6000, ...rest } = init ?? {};
  try {
    const res = await fetch(url, { ...rest, signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function compactNumber(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
