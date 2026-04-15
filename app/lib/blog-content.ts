import type { ComponentType, HTMLAttributes } from "react";

import type { BlogPost } from "~/lib/blog";

export type BlogMdxComponents = {
  pre?: ComponentType<HTMLAttributes<HTMLPreElement>>;
};

export type BlogPostComponent = ComponentType<{
  components?: BlogMdxComponents;
}>;

const postComponents = import.meta.glob("/content/blog/*.mdx", {
  eager: true,
  import: "default",
}) as Record<string, BlogPostComponent>;

export function getPostComponent(post: BlogPost) {
  return postComponents[post.sourcePath];
}
