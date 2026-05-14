import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAllPoems } from "~/lib/poetry";
import {
  defaultOgImage,
  pageTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

const title = pageTitle("Poetry");
const description =
  "Verses on mortality, memory, and the quiet weather of being alive — poems written in the margins of code.";
const url = `${siteUrl}/poetry`;

export const Route = createFileRoute("/poetry/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: defaultOgImage },
      { name: "twitter:creator", content: twitterCreator },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: PoetryIndex,
});

function PoetryIndex() {
  const poems = getAllPoems();

  return (
    <main className="min-h-screen bg-background text-zinc-100">
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 lg:py-16">
        <Link
          to="/"
          className="mb-12 inline-flex w-fit items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <header className="mb-14 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 block font-mono text-sm text-primary"
          >
            // POETRY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Verses from the <span className="gradient-text">quiet hours</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400"
          >
            Poems written in the margins of code — on mortality, memory, and the
            small, strange weather of being alive.
          </motion.p>
        </header>

        <section className="max-w-3xl divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {poems.map((poem, index) => (
            <motion.article
              key={poem.sourceSlug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * index }}
            >
              <Link
                to="/poetry/$slug"
                params={{ slug: poem.slug }}
                className="group grid gap-3 py-5 transition-colors duration-300 hover:text-primary sm:grid-cols-[1fr_auto] sm:items-center md:py-6"
              >
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-primary md:text-2xl">
                    {poem.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
                    <time dateTime={poem.date}>{poem.formattedDate}</time>
                    <span className="text-zinc-700">/</span>
                    <span>{poem.lineCount} lines</span>
                  </div>
                </div>
                <ArrowUpRight className="hidden h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </Link>
            </motion.article>
          ))}

          {poems.length === 0 && (
            <div className="rounded-lg border border-zinc-800 bg-surface/30 p-8 text-zinc-400">
              No poems yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
