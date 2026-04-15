export interface BlogPost {
  slug: string;
  sourceSlug: string;
  title: string;
  date?: string;
  formattedDate: string;
  preview: string;
  readingMinutes: number;
  tags: string[];
  body: string;
}

const postModules = import.meta.glob("/content/blog/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---\n")) {
    return { metadata: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    return { metadata: {}, body: markdown };
  }

  const rawMetadata = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 4).replace(/^\n/, "");
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
  return (
    body
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .find((part) => part && !part.startsWith("#")) ?? ""
  );
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatPostDate(date?: string) {
  if (!date) return "Undated";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function normalizePost(path: string, markdown: string): BlogPost {
  const sourceSlug = getFilename(path);
  const inferred = splitFilename(sourceSlug);
  const { metadata, body } = parseFrontmatter(markdown);
  const slug = metadata.slug ?? inferred.slug;
  const date = metadata.date ?? inferred.date;
  const tags = metadata.tags
    ? metadata.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
  const preview = metadata.excerpt ?? previewFromBody(body);

  return {
    slug,
    sourceSlug,
    title: metadata.title ?? titleFromSlug(inferred.slug),
    date,
    formattedDate: formatPostDate(date),
    preview,
    readingMinutes: readingMinutes(body),
    tags,
    body,
  };
}

export function getAllPosts() {
  return Object.entries(postModules)
    .map(([path, markdown]) => normalizePost(path, markdown))
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find(
    (post) => post.slug === slug || post.sourceSlug === slug,
  );
}
