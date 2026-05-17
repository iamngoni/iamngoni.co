import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "~/lib/blog";
import {
  defaultOgImage,
  pageTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

const title = pageTitle("Writing");
const description =
  "Engineering notes, shipped experiments, architecture decisions, and lessons from building software across mobile, backend, and systems work.";
const url = `${siteUrl}/blog`;

export const Route = createFileRoute("/blog/")({
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
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen overflow-hidden bg-portfolio-ivory text-portfolio-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,hsl(40_38%_92%/0.95),transparent_36%),radial-gradient(circle_at_82%_72%,hsl(154_12%_70%/0.20),transparent_32%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 lg:py-16">
        <Link
          to="/"
          className="mb-12 inline-flex w-fit items-center gap-2 text-sm font-mono text-portfolio-soft transition-colors hover:text-portfolio-copper"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <header className="mb-14 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 block font-mono text-sm text-portfolio-copper"
          >
            // WRITING
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-5xl leading-none md:text-7xl"
          >
            Notes from the <span className="gradient-text">build log</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base leading-8 text-portfolio-soft"
          >
            Engineering notes, shipped experiments, architecture decisions, and
            the parts of software work that are easier to explain after the code
            exists.
          </motion.p>
        </header>

        <section className="max-w-3xl divide-y divide-portfolio-line border-y border-portfolio-line">
          {posts.map((post, index) => (
            <motion.article
              key={post.sourceSlug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * index }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-3 py-5 transition-colors duration-300 hover:text-portfolio-copper sm:grid-cols-[1fr_auto] sm:items-center md:py-6"
              >
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold leading-snug text-portfolio-ink transition-colors group-hover:text-portfolio-copper md:text-2xl">
                    {post.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-portfolio-soft">
                    <time dateTime={post.date}>{post.formattedDate}</time>
                    <span className="text-portfolio-copper/60">/</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                </div>
                <ArrowUpRight className="hidden h-4 w-4 text-portfolio-moss transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-portfolio-copper sm:block" />
              </Link>
            </motion.article>
          ))}

          {posts.length === 0 && (
            <div className="rounded-lg border border-portfolio-line bg-portfolio-paper/55 p-8 text-portfolio-soft">
              No posts yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
