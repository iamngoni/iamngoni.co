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
    const image = poem.image
      ? new URL(poem.image, siteUrl).toString()
      : defaultOgImage;
    const imageType =
      poem.image?.endsWith(".jpg") || poem.image?.endsWith(".jpeg")
        ? "image/jpeg"
        : "image/png";
    const meta = [
      { title },
      { name: "description", content: poem.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: poem.description },
      { property: "og:image", content: image },
      ...(poem.image
        ? [
            { property: "og:image:secure_url", content: image },
            { property: "og:image:type", content: imageType },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: poem.description },
      { name: "twitter:image", content: image },
      { name: "twitter:creator", content: twitterCreator },
      ...(poem.imageAlt
        ? [
            { property: "og:image:alt", content: poem.imageAlt },
            { name: "twitter:image:alt", content: poem.imageAlt },
          ]
        : []),
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
      <main className="min-h-screen bg-portfolio-ivory px-6 py-10 text-portfolio-ink">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/poetry"
            className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-portfolio-soft transition-colors hover:text-portfolio-copper"
          >
            <ArrowLeft className="h-4 w-4" />
            Poetry
          </Link>
          <h1 className="font-display text-5xl">Poem not found</h1>
          <p className="mt-4 text-portfolio-soft">
            That file does not exist in the poetry directory.
          </p>
        </div>
      </main>
    );
  }

  const stanzas = poem.body.split(/\n\s*\n/).map((stanza) => stanza.trimEnd());

  return (
    <main className="relative min-h-screen overflow-hidden bg-portfolio-ivory text-portfolio-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,hsl(40_38%_92%/0.95),transparent_34%),radial-gradient(circle_at_84%_78%,hsl(154_12%_70%/0.18),transparent_34%)]" />
      <article className="relative mx-auto max-w-3xl px-6 py-10 lg:py-16">
        <Link
          to="/poetry"
          className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-portfolio-soft transition-colors hover:text-portfolio-copper"
        >
          <ArrowLeft className="h-4 w-4" />
          Poetry
        </Link>

        <header className="mb-12 border-b border-portfolio-line pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-mono text-portfolio-soft">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {poem.formattedDate}
            </span>
            <span className="text-portfolio-copper/60">/</span>
            <span className="inline-flex items-center gap-1.5">
              <AlignLeft className="h-3.5 w-3.5" />
              {poem.lineCount} lines
            </span>
          </div>
          <h1 className="font-display text-5xl leading-none md:text-7xl">
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
