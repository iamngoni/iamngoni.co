import { createFileRoute } from "@tanstack/react-router";
import { MainScreen } from "~/components";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <MainScreen />;
}
