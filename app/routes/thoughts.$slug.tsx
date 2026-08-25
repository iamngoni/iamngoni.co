import { useState, type FormEvent } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, AlignLeft, Lock } from "lucide-react";
import { decryptProtectedContent } from "~/lib/protected-content";
import { getPoemBySlug, type Poem } from "~/lib/poetry";
import {
  defaultOgImage,
  pageTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

const poemSlugRedirects: Record<string, string> = {
  mothers: "trust-on-loan",
};

export const Route = createFileRoute("/thoughts/$slug")({
  beforeLoad: ({ params }) => {
    const canonicalSlug = poemSlugRedirects[params.slug];

    if (canonicalSlug) {
      throw redirect({
        href: `/thoughts/${canonicalSlug}`,
        statusCode: 301,
      });
    }
  },
  head: ({ params }) => {
    const poem = getPoemBySlug(params.slug);
    const url = `${siteUrl}/thoughts/${poem?.slug ?? params.slug}`;

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
    const image =
      !poem.protected && poem.image
        ? new URL(poem.image, siteUrl).toString()
        : defaultOgImage;
    const imageType =
      !poem.protected &&
      (poem.image?.endsWith(".jpg") || poem.image?.endsWith(".jpeg"))
        ? "image/jpeg"
        : "image/png";
    const meta = [
      { title },
      { name: "description", content: poem.description },
      ...(poem.protected
        ? [{ name: "robots", content: "noindex, nofollow" }]
        : []),
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: poem.description },
      { property: "og:image", content: image },
      ...(!poem.protected && poem.image
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
  component: ThoughtsPost,
});

function ThoughtsPost() {
  const { slug } = Route.useParams();
  const poem = getPoemBySlug(slug);

  if (!poem) {
    return (
      <main className="min-h-screen bg-portfolio-ivory px-6 py-10 text-portfolio-ink">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/thoughts"
            className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-portfolio-soft transition-colors hover:text-portfolio-copper"
          >
            <ArrowLeft className="h-4 w-4" />
            Intrusive Thoughts
          </Link>
          <h1 className="font-display text-5xl">Poem not found</h1>
          <p className="mt-4 text-portfolio-soft">
            That file does not exist in the poetry directory.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-portfolio-ivory text-portfolio-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,hsl(40_38%_92%/0.95),transparent_34%),radial-gradient(circle_at_84%_78%,hsl(154_12%_70%/0.18),transparent_34%)]" />
      <article className="relative mx-auto max-w-3xl px-6 py-10 lg:py-16">
        <Link
          to="/thoughts"
          className="mb-12 inline-flex items-center gap-2 text-sm font-mono text-portfolio-soft transition-colors hover:text-portfolio-copper"
        >
          <ArrowLeft className="h-4 w-4" />
          Intrusive Thoughts
        </Link>

        <header className="mb-12 border-b border-portfolio-line pb-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-mono text-portfolio-soft">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {poem.formattedDate}
            </span>
            <span className="text-portfolio-copper/60">/</span>
            <span className="inline-flex items-center gap-1.5">
              {poem.protected ? (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Protected
                </>
              ) : (
                <>
                  <AlignLeft className="h-3.5 w-3.5" />
                  {poem.lineCount} lines
                </>
              )}
            </span>
          </div>
          <h1 className="font-display text-5xl leading-none md:text-7xl">
            {poem.title}
          </h1>
        </header>

        {poem.protected ? (
          <ProtectedPoem poem={poem} />
        ) : (
          <PoemBody body={poem.body} />
        )}
      </article>
    </main>
  );
}

function PoemBody({ body }: { body: string }) {
  const stanzas = body.split(/\n\s*\n/).map((stanza) => stanza.trimEnd());

  return (
    <div className="poetry-content">
      {stanzas.map((stanza, index) => (
        <p key={index} className="poetry-stanza">
          {stanza}
        </p>
      ))}
    </div>
  );
}

function ProtectedPoem({ poem }: { poem: Poem }) {
  const [password, setPassword] = useState("");
  const [unlockedBody, setUnlockedBody] = useState("");
  const [error, setError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!poem.protectedContent) {
      setError("This piece cannot be opened right now.");
      return;
    }

    setError("");
    setIsUnlocking(true);

    try {
      const content = await decryptProtectedContent(
        poem.protectedContent,
        password,
      );
      setUnlockedBody(content);
      setPassword("");
    } catch {
      setError("That word did not open this piece.");
    } finally {
      setIsUnlocking(false);
    }
  }

  if (unlockedBody) {
    return <PoemBody body={unlockedBody} />;
  }

  return (
    <section className="max-w-xl border-y border-portfolio-line py-10">
      <Lock className="mb-6 h-5 w-5 text-portfolio-copper" />
      <h2 className="font-display text-3xl leading-tight text-portfolio-ink">
        This piece is not public.
      </h2>
      <p className="mt-4 text-base leading-8 text-portfolio-soft">
        If it was meant for you, you already know the word.
      </p>
      <form onSubmit={handleUnlock} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-portfolio-soft">
            Word
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
            required
            className="w-full rounded-md border border-portfolio-line bg-portfolio-paper px-4 py-3 text-base text-portfolio-ink outline-none transition-colors placeholder:text-portfolio-soft/55 focus:border-portfolio-copper"
            placeholder="Enter it here"
          />
        </label>
        {error && (
          <p className="font-mono text-sm text-portfolio-copper">{error}</p>
        )}
        <button
          type="submit"
          disabled={isUnlocking}
          className="inline-flex items-center justify-center rounded-md bg-portfolio-ink px-5 py-3 font-mono text-sm text-portfolio-ivory transition-colors hover:bg-portfolio-copper disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUnlocking ? "Opening..." : "Open"}
        </button>
      </form>
    </section>
  );
}
