import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getPostComponent } from "~/lib/blog-content";
import { getPostBySlug } from "~/lib/blog";
import {
  defaultOgImage,
  pageTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    const url = `${siteUrl}/blog/${post?.slug ?? params.slug}`;

    if (!post) {
      const title = pageTitle("Post not found");

      return {
        meta: [
          { title },
          { name: "description", content: "That blog post could not be found." },
          { name: "robots", content: "noindex, follow" },
          { property: "og:url", content: url },
          { property: "og:title", content: title },
          { property: "og:description", content: "That blog post could not be found." },
          { name: "twitter:url", content: url },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: "That blog post could not be found." },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }

    const title = pageTitle(post.title);
    const meta = [
      { title },
      { name: "description", content: post.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: post.description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: post.description },
      { name: "twitter:image", content: defaultOgImage },
      { name: "twitter:creator", content: twitterCreator },
      ...(post.date
        ? [{ property: "article:published_time", content: post.date }]
        : []),
      ...post.tags.map((tag) => ({ property: "article:tag", content: tag })),
    ];

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);
  const PostContent = post ? getPostComponent(post) : undefined;

  if (!post || !PostContent) {
    return (
      <main className="min-h-screen bg-background px-6 py-10 text-zinc-100">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Writing
          </Link>
          <h1 className="text-4xl font-bold">Post not found</h1>
          <p className="mt-4 text-zinc-400">
            That MDX file does not exist in the blog directory.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-zinc-100">
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
      <article className="relative mx-auto max-w-3xl px-6 py-10 lg:py-16">
        <Link
          to="/blog"
          className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Writing
        </Link>

        <header className="mb-10 border-b border-zinc-800 pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
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
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {post.title}
          </h1>
        </header>

        <div className="blog-content">
          <PostContent />
        </div>
      </article>
    </main>
  );
}
