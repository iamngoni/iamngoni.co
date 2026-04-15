import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts } from "~/lib/blog";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();

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
            // WRITING
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Notes from the <span className="gradient-text">build log</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400"
          >
            Engineering notes, shipped experiments, architecture decisions, and
            the parts of software work that are easier to explain after the code
            exists.
          </motion.p>
        </header>

        <section className="space-y-4">
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
                className="group block rounded-lg border border-zinc-800 bg-surface/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface/55 hover:shadow-[0_0_28px_rgba(0,240,255,0.08)] md:p-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.formattedDate}
                  </span>
                  <span className="text-zinc-700">/</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100 transition-colors group-hover:text-primary md:text-3xl">
                      {post.title}
                    </h2>
                    {post.preview && (
                      <div className="blog-excerpt mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          allowedElements={[
                            "p",
                            "strong",
                            "em",
                            "code",
                            "a",
                            "del",
                          ]}
                          unwrapDisallowed
                        >
                          {post.preview}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </motion.article>
          ))}

          {posts.length === 0 && (
            <div className="rounded-lg border border-zinc-800 bg-surface/30 p-8 text-zinc-400">
              No posts yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
