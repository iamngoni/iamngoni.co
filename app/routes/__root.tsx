/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../global.css?url";

const siteUrl = "https://iamngoni.dev";
const title = "Ngonidzashe Mangudya | Backend & Mobile Developer";
const description =
  "Portfolio of Ngonidzashe Mangudya - Backend & Mobile Developer with 5+ years of Flutter experience. Building scalable backends and beautiful mobile apps. Talk is cheap. Show me the code.";
const ogImage = `${siteUrl}/images/banner.png`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#0a0a0f" },
      {
        name: "keywords",
        content:
          "Ngonidzashe Mangudya, Flutter Developer, Mobile Developer, Backend Developer, Dart, Zimbabwe Developer, Software Engineer, Full Stack Developer, pub.dev packages, CodeCraft Solutions",
      },
      { name: "author", content: "Ngonidzashe Mangudya" },
      { name: "robots", content: "index, follow" },

      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Ngonidzashe Mangudya" },
      { property: "og:locale", content: "en_US" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: siteUrl },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:creator", content: "@iamngoni" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "canonical", href: siteUrl },
      { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ngonidzashe Mangudya",
          url: siteUrl,
          image: ogImage,
          jobTitle: "Backend & Mobile Developer",
          worksFor: {
            "@type": "Organization",
            name: "CodeCraft Solutions",
            url: "https://codecraftsolutions.co.za",
          },
          sameAs: [
            "https://github.com/iamngoni",
            "https://twitter.com/iamngoni",
            "https://www.linkedin.com/in/ngonidzashe-mangudya-ba084a174/",
            "https://pub.dev/publishers/iamngoni.co.zw",
          ],
          knowsAbout: [
            "Flutter",
            "Dart",
            "Mobile Development",
            "Backend Development",
            "Software Engineering",
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
