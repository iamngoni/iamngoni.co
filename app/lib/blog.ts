export interface BlogPost {
  sourcePath: string;
  slug: string;
  sourceSlug: string;
  title: string;
  date?: string;
  formattedDate: string;
  description: string;
  preview: string;
  readingMinutes: number;
  tags: string[];
  body: string;
}

const postSources = import.meta.glob("/content/blog/*.mdx", {
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
  return path.split("/").pop()?.replace(/\.mdx$/, "") ?? path;
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
      .find(
        (part) =>
          part &&
          !part.startsWith("#") &&
          !part.startsWith("import ") &&
          !part.startsWith("export "),
      ) ?? ""
  );
}

function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/^\s*import\s.+$/gm, "")
    .replace(/^\s*export\s.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function bodyWithoutLeadingTitle(body: string, title: string) {
  const leadingTitle = body.match(/^#\s+(.+?)\n+/);

  if (!leadingTitle) return body;

  if (markdownToPlainText(leadingTitle[1]) !== title) {
    return body;
  }

  return body.slice(leadingTitle[0].length);
}

function truncateDescription(value: string) {
  if (value.length <= 160) return value;

  return `${value.slice(0, 157).replace(/\s+\S*$/, "")}...`;
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

function getMarkdownSource(source: unknown) {
  return typeof source === "string" ? source : "";
}

function normalizePost(path: string, source: unknown): BlogPost {
  const markdown = getMarkdownSource(source);
  const sourcePath = getComponentPath(path);
  const sourceSlug = getFilename(sourcePath);
  const inferred = splitFilename(sourceSlug);
  const { metadata, body } = parseFrontmatter(markdown);
  const slug = metadata.slug ?? inferred.slug;
  const date = metadata.date ?? inferred.date;
  const title = metadata.title ?? titleFromSlug(inferred.slug);
  const content = bodyWithoutLeadingTitle(body, title);
  const tags = metadata.tags
    ? metadata.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
  const preview = metadata.excerpt ?? previewFromBody(content);
  const description = truncateDescription(
    metadata.description ?? (markdownToPlainText(preview) || title),
  );

  return {
    sourcePath,
    slug,
    sourceSlug,
    title,
    date,
    formattedDate: formatPostDate(date),
    description,
    preview,
    readingMinutes: readingMinutes(content),
    tags,
    body: content,
  };
}

export function getAllPosts() {
  return Object.entries(postSources)
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
