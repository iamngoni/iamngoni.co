interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: {
      eager?: boolean;
      import?: string;
      query?: string | Record<string, string | boolean>;
    },
  ): Record<string, T>;
}

declare module "*.css?url" {
  const href: string;
  export default href;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export default Component;
}
