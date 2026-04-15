import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const blogDir = join(rootDir, "content", "blog");
const siteConfigPath = join(rootDir, "app", "lib", "site.ts");
const sitemapPath = join(rootDir, "public", "sitemap.xml");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return {};
  }

  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    return {};
  }

  return markdown
    .slice(4, end)
    .trim()
    .split("\n")
    .reduce((metadata, line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return metadata;

      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      metadata[key] = value;
      return metadata;
    }, {});
}

function splitFilename(filename) {
  const sourceSlug = filename.replace(/\.mdx$/, "");
  const match = sourceSlug.match(/^(.*)-(\d{4}-\d{2}-\d{2})$/);

  if (!match) {
    return { sourceSlug, slug: sourceSlug, date: undefined };
  }

  return { sourceSlug, slug: match[1], date: match[2] };
}

function entry(path, { lastmod, changefreq, priority }) {
  return {
    path,
    lastmod,
    changefreq,
    priority,
  };
}

function renderUrl(baseUrl, item) {
  const loc = item.path === "/" ? `${baseUrl}/` : `${baseUrl}${item.path}`;
  const lines = ["  <url>", `    <loc>${escapeXml(loc)}</loc>`];

  if (item.lastmod) {
    lines.push(`    <lastmod>${escapeXml(item.lastmod)}</lastmod>`);
  }

  lines.push(`    <changefreq>${item.changefreq}</changefreq>`);
  lines.push(`    <priority>${item.priority}</priority>`);
  lines.push("  </url>");

  return lines.join("\n");
}

async function getSiteUrl() {
  const siteConfig = await readFile(siteConfigPath, "utf8");
  const match = siteConfig.match(/export const siteUrl = ["'](.+?)["']/);

  if (!match) {
    throw new Error(`Unable to find siteUrl in ${siteConfigPath}`);
  }

  return match[1].replace(/\/$/, "");
}

async function getPosts() {
  const filenames = (await readdir(blogDir)).filter((filename) =>
    filename.endsWith(".mdx"),
  );

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const markdown = await readFile(join(blogDir, filename), "utf8");
      const metadata = parseFrontmatter(markdown);
      const inferred = splitFilename(filename);

      return {
        slug: metadata.slug ?? inferred.slug,
        date: metadata.date ?? inferred.date,
      };
    }),
  );

  return posts.sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
}

async function main() {
  const [siteUrl, posts] = await Promise.all([getSiteUrl(), getPosts()]);
  const latestPostDate = posts.find((post) => post.date)?.date;
  const urls = [
    entry("/", {
      lastmod: latestPostDate,
      changefreq: "weekly",
      priority: "1.0",
    }),
    entry("/blog", {
      lastmod: latestPostDate,
      changefreq: "weekly",
      priority: "0.8",
    }),
    ...posts.map((post) =>
      entry(`/blog/${post.slug}`, {
        lastmod: post.date,
        changefreq: "monthly",
        priority: "0.7",
      }),
    ),
  ];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.map((item) => renderUrl(siteUrl, item)).join("\n"),
    "</urlset>",
    "",
  ].join("\n");

  await writeFile(sitemapPath, sitemap);
  console.log(`Generated ${sitemapPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
