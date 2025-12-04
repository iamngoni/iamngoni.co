/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../global.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Ngonidzashe Mangudya | Backend & Mobile Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Ngonidzashe Mangudya - Backend & Mobile Developer with 5+ years of Flutter experience. Talk is cheap. Show me the code.",
      },
      {
        name: "theme-color",
        content: "#0a0a0f",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
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
