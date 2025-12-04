import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/marketstack/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { _splat } = params;
        const url = new URL(request.url);

        // Build MarketStack URL with the path and query string
        const marketStackUrl = `http://api.marketstack.com/${_splat}${url.search}`;

        try {
          const response = await fetch(marketStackUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.text();

          return new Response(data, {
            status: response.status,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: "Proxy failed" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      },
    },
  },
});
