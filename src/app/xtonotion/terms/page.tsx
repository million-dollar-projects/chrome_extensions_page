import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | X/Twitter Tweet Backup",
  description: "Terms of Use for the X/Twitter Tweet Backup Chrome extension.",
};

const productName = "X/Twitter Tweet Backup";
const contactEmail = "lnmput@gmail.com";
const lastUpdated = "May 20, 2026";

export default function TermsPage() {
  return (
    <LegalPage productName={productName} title="Terms of Use" lastUpdated={lastUpdated}>
      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Acceptance of Terms</h2>
        <p className="mt-3">
          By installing or using X/Twitter Tweet Backup, you agree to these Terms of Use. If you do not agree, do not use the extension.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Permitted Use</h2>
        <p className="mt-3">
          You may use the extension to export X/Twitter tweet detail pages and visible thread content to Markdown, and to sync that content to your own Notion workspace when you authorize Notion access.
        </p>
        <p className="mt-3">
          You agree not to use the extension for unlawful activity, to violate third-party rights, or to bypass access controls or platform restrictions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Your Responsibility for Content</h2>
        <p className="mt-3">
          You are responsible for the content you export, download, store, share, or sync. You should ensure that your use of exported X/Twitter content complies with applicable laws, platform terms, and third-party rights.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Third-Party Services</h2>
        <p className="mt-3">
          The extension interacts with third-party services including X/Twitter, Notion, Chrome, and Supabase. Your use of those services is governed by their own terms and policies. We are not responsible for changes, outages, data handling, or restrictions imposed by third-party services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">No Warranty</h2>
        <p className="mt-3">
          The extension is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not guarantee that exports, synchronization, authentication, or third-party integrations will always be available, accurate, complete, or uninterrupted.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Limitation of Liability</h2>
        <p className="mt-3">
          To the maximum extent permitted by law, we are not liable for indirect, incidental, consequential, special, or punitive damages, or for loss of data, profits, or business opportunities arising from your use of the extension.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Changes to These Terms</h2>
        <p className="mt-3">
          We may update these Terms of Use from time to time. Continued use of the extension after changes are posted means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Contact</h2>
        <p className="mt-3">
          If you have questions about these Terms of Use, contact us at <a className="font-medium text-emerald-700" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
