import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, AlignLeft } from "lucide-react";
import { getPoemBySlug } from "~/lib/poetry";
import {
  defaultOgImage,
  pageTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

export const Route = createFileRoute("/poetry/$slug")({
  head: ({ params }) => {
    const poem = getPoemBySlug(params.slug);
    const url = `${siteUrl}/poetry/${poem?.slug ?? params.slug}`;

    if (!poem) {
      const title = pageTitle("Poem not found");

      return {
        meta: [
          { title },
          { name: "description", content: "That poem could not be found." },
          { name: "robots", content: "noindex, follow" },
          { property: "og:url", content: url },
          { property: "og:title", content: title },
          { property: "og:description", content: "That poem could not be found." },
          { name: "twitter:url", content: url },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: "That poem could not be found." },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }

    const title = pageTitle(poem.title);
    const meta = [
      { title },
      { name: "description", content: poem.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: poem.description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: poem.description },
      { name: "twitter:image", content: defaultOgImage },
      { name: "twitter:creator", content: twitterCreator },
      ...(poem.date
        ? [{ property: "article:published_time", content: poem.date }]
        : []),
    ];

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PoetryPost,
});

function PoetryPost() {
  const { slug } = Route.useParams();
  const poem = getPoemBySlug(slug);

  if (!poem) {
    return (
      <main className="min-h-screen bg-background px-6 py-10 text-zinc-100">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/poetry"
            className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Poetry
          </Link>
          <h1 className="text-4xl font-bold">Poem not found</h1>
          <p className="mt-4 text-zinc-400">
            That file does not exist in the poetry directory.
          </p>
        </div>
      </main>
    );
  }

  const stanzas = poem.body.split(/\n\s*\n/).map((stanza) => stanza.trimEnd());

  return (
    <main className="min-h-screen bg-background text-zinc-100">
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
      <article className="relative mx-auto max-w-3xl px-6 py-10 lg:py-16">
        <Link
          to="/poetry"
          className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Poetry
        </Link>

        <header className="mb-12 border-b border-zinc-800 pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {poem.formattedDate}
            </span>
            <span className="text-zinc-700">/</span>
            <span className="inline-flex items-center gap-1.5">
              <AlignLeft className="h-3.5 w-3.5" />
              {poem.lineCount} lines
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {poem.title}
          </h1>
        </header>

        <div className="poetry-content">
          {stanzas.map((stanza, index) => (
            <p key={index} className="poetry-stanza">
              {stanza}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
