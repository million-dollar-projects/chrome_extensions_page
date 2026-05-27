import type { Metadata } from "next";
import { UninstallFeedbackForm } from "@/components/UninstallFeedbackForm";

export const metadata: Metadata = {
  title: "Uninstall Feedback",
  description: "Share why you uninstalled a Chrome extension.",
};

interface UninstallPageProps {
  searchParams?: {
    product?: string;
    extensionId?: string;
    extId?: string;
    version?: string;
    locale?: string;
  };
}

export default function UninstallPage({ searchParams }: UninstallPageProps) {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 sm:py-16">
      <section className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
        <UninstallFeedbackForm
          product={searchParams?.product}
          extensionId={searchParams?.extensionId || searchParams?.extId}
          version={searchParams?.version}
          locale={searchParams?.locale}
        />
      </section>
    </main>
  );
}
