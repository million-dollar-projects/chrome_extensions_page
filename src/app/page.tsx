import Link from "next/link";

const products = [
  {
    name: "X/Twitter Tweet Backup",
    slug: "xtonotion",
    description: "Export X/Twitter tweet detail pages and visible threads to Markdown, with optional Notion sync.",
    hasTerms: true,
  },
  {
    name: "ChatGPT & AI Chat Backup",
    slug: "ai-chat-backup",
    description: "Export AI conversations to Markdown or an Obsidian folder, with optional Notion sync.",
    hasTerms: false,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-10">
      <section className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Chrome Extensions</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Legal Pages</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Privacy policies and terms of use for our Chrome extension products.
        </p>
        <div className="mt-10 grid gap-4">
          {products.map((product) => (
            <article key={product.slug} className="rounded-xl border border-zinc-200 p-5">
              <h2 className="text-xl font-semibold text-zinc-950">{product.name}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
                <Link className="rounded-md bg-zinc-950 px-4 py-2 text-white" href={`/${product.slug}/privacy`}>
                  Privacy Policy
                </Link>
                {product.hasTerms && (
                  <Link className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-800" href={`/${product.slug}/terms`}>
                    Terms of Use
                  </Link>
                )}
                <Link
                  className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-800"
                  href={`/uninstall?product=${encodeURIComponent(product.name)}`}
                >
                  Uninstall Feedback
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
