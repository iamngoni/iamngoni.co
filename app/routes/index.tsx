import { createFileRoute } from "@tanstack/react-router";
import { MainScreen } from "~/components";
import { siteUrl } from "~/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: Home,
});

function Home() {
  return <MainScreen />;
}
