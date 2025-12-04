// Cloudflare Pages Function to proxy MarketStack API requests
// This allows the Flutter app to make HTTPS requests that get proxied to HTTP

export const onRequest: PagesFunction = async (context) => {
  const { request, params } = context;

  // Get the path segments after /api/marketstack/
  const pathSegments = params.path as string[];
  const apiPath = pathSegments ? pathSegments.join("/") : "";

  // Build the MarketStack API URL
  const url = new URL(request.url);
  const marketStackUrl = `http://api.marketstack.com/${apiPath}${url.search}`;

  try {
    // Forward the request to MarketStack
    const response = await fetch(marketStackUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Get the response body
    const data = await response.text();

    // Return the response with CORS headers
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to proxy request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

// Handle CORS preflight requests
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
