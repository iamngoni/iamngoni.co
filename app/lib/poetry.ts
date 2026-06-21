import type { ProtectedContent } from "./protected-content";

export interface Poem {
  sourcePath: string;
  slug: string;
  sourceSlug: string;
  title: string;
  date?: string;
  formattedDate: string;
  description: string;
  image?: string;
  imageAlt?: string;
  preview: string;
  lineCount: number;
  listed: boolean;
  protected: boolean;
  protectedPrompt?: string;
  protectedContent?: ProtectedContent;
  body: string;
}

const poemSources = import.meta.glob("/content/poetry/*.md", {
  eager: true,
  import: "default",
  query: {
    raw: "",
  },
}) as Record<string, unknown>;

function getComponentPath(path: string) {
  return path.replace(/\?.*$/, "");
}

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---\n")) {
    return { metadata: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    return { metadata: {}, body: markdown };
  }

  const rawMetadata = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 4).replace(/^\n+/, "");
  const metadata: Record<string, string> = {};

  for (const line of rawMetadata.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    metadata[key] = value;
  }

  return { metadata, body };
}

function getFilename(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

function splitFilename(filename: string) {
  const match = filename.match(/^(.*)-(\d{4}-\d{2}-\d{2})$/);

  if (!match) {
    return { slug: filename, date: undefined };
  }

  return { slug: match[1], date: match[2] };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function previewFromBody(body: string) {
  const firstStanza = body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part.length > 0);

  return firstStanza ?? "";
}

function truncateDescription(value: string) {
  const flattened = value.replace(/\s+/g, " ").trim();

  if (flattened.length <= 160) return flattened;

  return `${flattened.slice(0, 157).replace(/\s+\S*$/, "")}...`;
}

function countLines(body: string) {
  return body.split("\n").filter((line) => line.trim().length > 0).length;
}

function booleanFromMetadata(value: string | undefined, fallback = false) {
  if (!value) return fallback;
  return value === "true";
}

function numberFromMetadata(value: string | undefined, fallback: number) {
  if (!value) return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formatPoemDate(date?: string) {
  if (!date) return "Undated";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getMarkdownSource(source: unknown) {
  return typeof source === "string" ? source : "";
}

function normalizePoem(path: string, source: unknown): Poem {
  const markdown = getMarkdownSource(source);
  const sourcePath = getComponentPath(path);
  const sourceSlug = getFilename(sourcePath);
  const inferred = splitFilename(sourceSlug);
  const { metadata, body } = parseFrontmatter(markdown);
  const slug = metadata.slug ?? inferred.slug;
  const date = metadata.date ?? inferred.date;
  const title = metadata.title ?? titleFromSlug(inferred.slug);
  const isProtected = booleanFromMetadata(metadata.protected);
  const content = isProtected ? "" : body.trimEnd();
  const encryptedBody = isProtected ? body.trim() : undefined;
  const preview = isProtected
    ? (metadata.preview ?? "")
    : previewFromBody(content);
  const description = truncateDescription(
    metadata.description ?? preview ?? title,
  );
  const protectedContent =
    isProtected && encryptedBody
      ? {
          kdf: metadata.kdf ?? "PBKDF2-SHA-256",
          iterations: numberFromMetadata(metadata.iterations, 250000),
          salt: metadata.salt ?? "",
          iv: metadata.iv ?? "",
          ciphertext: encryptedBody,
        }
      : undefined;

  return {
    sourcePath,
    slug,
    sourceSlug,
    title,
    date,
    formattedDate: formatPoemDate(date),
    description,
    image: metadata.image,
    imageAlt: metadata.imageAlt,
    preview,
    lineCount: isProtected
      ? numberFromMetadata(metadata.lineCount, 0)
      : countLines(content),
    listed: metadata.listed !== "false",
    protected: isProtected,
    protectedPrompt: metadata.protectedPrompt,
    protectedContent,
    body: content,
  };
}

export function getAllPoems(options: { includeUnlisted?: boolean } = {}) {
  const poems = Object.entries(poemSources)
    .map(([path, markdown]) => normalizePoem(path, markdown))
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });

  if (options.includeUnlisted) return poems;

  return poems.filter((poem) => poem.listed);
}

export function getPoemBySlug(slug: string) {
  return getAllPoems({ includeUnlisted: true }).find(
    (poem) => poem.slug === slug || poem.sourceSlug === slug,
  );
}
