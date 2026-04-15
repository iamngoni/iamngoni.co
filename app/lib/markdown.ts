import bash from "highlight.js/lib/languages/bash";
import dart from "highlight.js/lib/languages/dart";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import typescript from "highlight.js/lib/languages/typescript";
import type { Options as ReactMarkdownOptions } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

export const markdownRemarkPlugins: NonNullable<
  ReactMarkdownOptions["remarkPlugins"]
> = [remarkFrontmatter, remarkGfm, remarkStripLeadingTitle];

export const markdownRehypePlugins: NonNullable<
  ReactMarkdownOptions["rehypePlugins"]
> = [
  [
    rehypeHighlight,
    {
      detect: true,
      ignoreMissing: true,
      languages: {
        bash,
        dart,
        json,
        python,
        rust,
        sh: bash,
        shell: bash,
        ts: typescript,
        typescript,
      },
    },
  ],
];

function remarkStripLeadingTitle() {
  return (tree: { children?: Array<{ type?: string; depth?: number }> }) => {
    const children = tree.children;
    if (!children) return;

    const titleIndex = children.findIndex(
      (node) => node.type !== "mdxjsEsm" && node.type !== "yaml",
    );

    if (children[titleIndex]?.type === "heading" && children[titleIndex].depth === 1) {
      children.splice(titleIndex, 1);
    }
  };
}
