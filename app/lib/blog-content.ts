import type { ComponentType } from "react";

import type { BlogPost } from "~/lib/blog";

export type BlogPostComponent = ComponentType;

const postComponents = import.meta.glob("/content/blog/*.mdx", {
  eager: true,
  import: "default",
}) as Record<string, BlogPostComponent>;

export function getPostComponent(post: BlogPost) {
  return postComponents[post.sourcePath];
}
