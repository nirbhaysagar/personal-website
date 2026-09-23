// Ultra-lightweight development server powered by Bun
const PORT = 3000;

console.log(`[BLUEPRINT OS] Starting server on http://localhost:${PORT}...`);

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    const filePath = import.meta.dir + pathname;
    const file = Bun.file(filePath);

    if (await file.exists()) {
      // Determine Content-Type
      let contentType = "text/plain";
      if (pathname.endsWith(".html")) contentType = "text/html";
      else if (pathname.endsWith(".css")) contentType = "text/css";
      else if (pathname.endsWith(".js")) contentType = "application/javascript";
      else if (pathname.endsWith(".json")) contentType = "application/json";
      else if (pathname.endsWith(".svg")) contentType = "image/svg+xml";

      return new Response(file, {
        headers: { "Content-Type": contentType }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log(`[BLUEPRINT OS] Live at http://localhost:${PORT}`);
