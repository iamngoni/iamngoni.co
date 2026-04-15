import mdx from "@mdx-js/rollup";
import { defineConfig } from "@tanstack/react-start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";
import {
  markdownRehypePlugins,
  markdownRemarkPlugins,
} from "./app/lib/markdown";

function mdxWithoutRawImports() {
  const plugin = mdx({
    rehypePlugins: markdownRehypePlugins,
    remarkPlugins: markdownRemarkPlugins,
  });
  const transform = plugin.transform;

  return {
    ...plugin,
    transform(value: string, id: string) {
      if (id.includes("?raw")) return undefined;
      return transform(value, id);
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [
      mdxWithoutRawImports(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
  server: {
    preset: "cloudflare-pages",
    unenv: cloudflare,
  },
});
