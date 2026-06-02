import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | ChatGPT & AI Chat Backup",
  description: "Privacy Policy for the ChatGPT & AI Chat Backup Chrome extension.",
};

const productName = "ChatGPT & AI Chat Backup";
const contactEmail = "lnmput@gmail.com";
const lastUpdated = "June 2, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      productName={productName}
      title="Privacy Policy"
      lastUpdated={lastUpdated}
      privacyHref="/ai-chat-backup/privacy"
      termsHref=""
    >
      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Overview</h2>
        <p className="mt-3">
          ChatGPT &amp; AI Chat Backup is a Chrome extension that helps users export AI conversations to Markdown,
          save Markdown files to a user-selected local folder such as an Obsidian vault, and optionally sync exported
          conversations to a user-authorized Notion workspace.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Supported AI Platforms and Page Content</h2>
        <p className="mt-3">
          When you use the extension on a supported AI chat page, the extension reads content from the active tab to
          prepare your export. Depending on the page, this may include conversation titles, prompts, responses, code
          blocks, tables, links, images, media links, and the source page URL. Supported platforms include ChatGPT,
          Claude, Gemini, Google AI Studio, Perplexity, Poe, and Grok.
        </p>
        <p className="mt-3">
          The extension does not continuously monitor your browsing activity and does not collect your general browsing
          history. Supported page content is processed when you use an export or sync feature.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Local Markdown Export and Folder Access</h2>
        <p className="mt-3">
          Markdown exports are created locally in your browser. You can download an export through your browser or
          choose a local folder for future exports. If you choose a folder, the extension stores a folder handle in
          browser-managed storage and the folder name in Chrome local storage. The extension requests write access
          before saving files to that folder.
        </p>
        <p className="mt-3">
          Local exports are not sent to our services unless you separately choose a feature that sends data, such as
          Notion sync or feedback submission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Notion OAuth and Optional Sync</h2>
        <p className="mt-3">
          If you connect Notion, the extension uses Notion OAuth through Supabase authentication. The extension may
          access your Notion account metadata, search authorized pages and databases, validate the selected databases,
          and create pages containing exported conversation content when you choose to sync.
        </p>
        <p className="mt-3">
          To support the connection, the extension stores your Notion database identifiers and Notion provider token in
          Supabase. Authentication session data and a temporary Notion connection cache are also stored in Chrome local
          storage. You can disconnect Notion from the extension settings and revoke access from Notion at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Chrome Local Storage</h2>
        <p className="mt-3">
          The extension uses Chrome local storage for settings and operational state. This may include Markdown export
          preferences, YAML front matter settings, folder names, authentication session data, Notion connection state,
          release-note state, update availability, warning dismissals, and feedback submission cooldown timestamps.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Feedback and Uninstall Survey</h2>
        <p className="mt-3">
          If you choose to submit feedback, the extension sends the information you enter to a configured GitHub
          repository as an issue. This may include the feedback type, title, description, optional email address,
          optional AI conversation share link for bug reports, and optional screenshots. Screenshots are uploaded to
          the configured GitHub repository. Do not submit sensitive information that you do not want included in a
          support request.
        </p>
        <p className="mt-3">
          If you uninstall the extension, Chrome may open an optional uninstall survey page with basic context such as
          the extension version and browser locale. Survey responses are submitted only if you choose to send them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Update Checks</h2>
        <p className="mt-3">
          The extension periodically requests update information from the configured update service. This allows the
          extension to notify you when a newer version is available.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Data Sharing and Sale</h2>
        <p className="mt-3">
          We do not sell your personal data. Data is shared only as needed to provide features you choose to use,
          including Supabase for authentication and connection configuration, Notion for optional synchronization,
          GitHub for feedback submission, and the configured update service for update checks. These third-party
          services process data under their own privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Data Retention and Your Choices</h2>
        <p className="mt-3">
          Local settings remain in your browser until you clear extension data or uninstall the extension. Notion
          connection configuration remains in Supabase until you disconnect the Notion connection. Content synced to
          Notion remains in your Notion workspace until you remove it. Feedback submitted to GitHub remains subject to
          the retention settings of the configured GitHub repository.
        </p>
        <p className="mt-3">
          You can use local Markdown export without connecting Notion. You can also clear local extension data,
          disconnect Notion, revoke Notion access, or uninstall the extension at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Changes to This Policy</h2>
        <p className="mt-3">
          We may update this Privacy Policy as the extension changes. The date at the top of this page identifies the
          latest version.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-950">Contact</h2>
        <p className="mt-3">
          If you have questions about this Privacy Policy, contact us at{" "}
          <a className="font-medium text-emerald-700" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
