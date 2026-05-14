import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/poetry")({
  component: PoetryLayout,
});

function PoetryLayout() {
  return <Outlet />;
}
