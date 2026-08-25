import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/thoughts")({
  component: ThoughtsLayout,
});

function ThoughtsLayout() {
  return <Outlet />;
}
