import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../global.css?url";
import { getExperienceYearsLabel } from "~/lib/experience";
import {
  defaultOgImage,
  defaultTitle,
  siteName,
  siteUrl,
  twitterCreator,
} from "~/lib/site";

const experienceYears = getExperienceYearsLabel();
const description =
  `Ngonidzashe Mangudya - Backend & Mobile Developer with ${experienceYears} years of mobile and backend experience. Building scalable backends and beautiful mobile apps. Talk is cheap. Show me the code.`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: defaultTitle },
      { name: "description", content: description },
      { name: "theme-color", content: "#f8f3e8" },
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
      { property: "og:title", content: defaultTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: siteName },
      { property: "og:locale", content: "en_US" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: siteUrl },
      { name: "twitter:title", content: defaultTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: defaultOgImage },
      { name: "twitter:creator", content: twitterCreator },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", sizes: "16x16", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteName,
          url: siteUrl,
          image: defaultOgImage,
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
      <body className="min-h-screen bg-portfolio-ivory">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
