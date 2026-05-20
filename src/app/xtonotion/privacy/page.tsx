import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | X/Twitter Tweet Backup",
  description: "Privacy Policy for the X/Twitter Tweet Backup Chrome extension.",
};

const productName = "X/Twitter Tweet Backup";
const contactEmail = "lnmput@gmail.com";
const lastUpdated = "May 20, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage productName={productName} title="Privacy Policy" lastUpdated={lastUpdated}>
      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Overview</h2>
        <p className="mt-3">
          X/Twitter Tweet Backup is a Chrome extension that helps users export the current X/Twitter tweet detail page and visible thread content to Markdown, with optional synchronization to a user-selected Notion database.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Information Processed by the Extension</h2>
        <p className="mt-3">
          When you use the extension on a supported X/Twitter tweet detail page, it reads visible page content from the active tab, such as tweet text, author information, source URLs, timestamps, and visible media links. This content is processed to create a Markdown export or a Notion page when you choose to sync.
        </p>
        <p className="mt-3">
          The extension does not continuously monitor your browsing activity. Page content is accessed only after you interact with the extension on the active tab.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Notion OAuth and Sync</h2>
        <p className="mt-3">
          If you connect Notion, the extension uses Notion OAuth to authorize access to the Notion workspace and database you select. The extension uses that authorization to validate the selected database and create pages containing exported tweet content.
        </p>
        <p className="mt-3">
          You can revoke the extension&apos;s Notion access from your Notion account or workspace settings at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Supabase Services</h2>
        <p className="mt-3">
          The extension uses Supabase to support Notion authentication, session handling, user database configuration, feedback submission, and related service state. Supabase may process account identifiers, Notion authorization/session information, database configuration, feedback text, and uploaded feedback images if you choose to submit them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Chrome Storage</h2>
        <p className="mt-3">
          The extension uses Chrome storage to save local preferences and state, including export settings, YAML front matter settings, Notion connection state, update status, warning dismissal state, and feedback submission cooldown information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Data Sharing and Sale</h2>
        <p className="mt-3">
          We do not sell your personal data. Exported tweet content is sent to Notion only when you choose to sync it. Feedback information is submitted only when you choose to send feedback.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">User Control</h2>
        <p className="mt-3">
          You can use the extension for local Markdown export without connecting Notion. You can disconnect or reauthorize Notion from the extension settings, revoke Notion access in Notion, clear extension storage through Chrome, or uninstall the extension at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Contact</h2>
        <p className="mt-3">
          If you have questions about this Privacy Policy, contact us at <a className="font-medium text-emerald-700" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
