import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  productName: string;
  title: string;
  lastUpdated: string;
  privacyHref?: string;
  termsHref?: string;
  children: ReactNode;
};

export function LegalPage({
  productName,
  title,
  lastUpdated,
  privacyHref = "/xtonotion/privacy",
  termsHref = "/xtonotion/terms",
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-8 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-10">
        <header className="border-b border-zinc-200 pb-8">
          <Link href="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            {productName}
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: {lastUpdated}</p>
        </header>
        <div className="legal-content mt-8 space-y-8 text-base leading-7 text-zinc-700">{children}</div>
        <footer className="mt-10 flex flex-wrap gap-3 border-t border-zinc-200 pt-6 text-sm font-medium text-zinc-700">
          {privacyHref && (
            <Link className="rounded-md border border-zinc-300 px-4 py-2 hover:bg-zinc-50" href={privacyHref}>
              Privacy Policy
            </Link>
          )}
          {termsHref && (
            <Link className="rounded-md border border-zinc-300 px-4 py-2 hover:bg-zinc-50" href={termsHref}>
              Terms of Use
            </Link>
          )}
        </footer>
      </article>
    </main>
  );
}
