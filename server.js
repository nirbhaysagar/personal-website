const http = require('http');
const fs = require('fs');
const path = require('path');

// Statically referenced so @vercel/nft bundles index.html with the function
let indexHtml = '';
try {
  indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
} catch (e1) {
  try {
    indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  } catch (e2) {
    console.error('Failed to preload index.html:', e2);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function resolveFile(rawPath) {
  let safePath = path.normalize(rawPath).replace(/^(\.\.[\/\\])+/, '');
  while (safePath.startsWith('/') || safePath.startsWith('\\')) {
    safePath = safePath.slice(1);
  }

  const searchDirs = [
    __dirname,
    process.cwd(),
    path.join(__dirname, '..'),
    path.resolve('.')
  ];

  for (const dir of searchDirs) {
    const full = path.join(dir, safePath);
    try {
      if (fs.existsSync(full) && fs.statSync(full).isFile()) {
        return full;
      }
    } catch (_) {}
  }
  return null;
}

function handler(req, res) {
  let reqPath = (req.url || '/').split('?')[0];

  // Route root and index directly
  if (reqPath === '/' || reqPath === '' || reqPath === '/index.html') {
    let freshHtml = indexHtml;
    try {
      freshHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    } catch (_) {}
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    });
    return res.end(freshHtml);
  }

  // Look for static file
  const fullPath = resolveFile(reqPath);
  if (fullPath) {
    const ext = path.extname(fullPath).toLowerCase();
    fs.readFile(fullPath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(`Server Error: ${err.code}`);
      }
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable'
      });
      res.end(content);
    });
    return;
  }

  // SPA fallback: return indexHtml if not found
  if (indexHtml) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    });
    return res.end(indexHtml);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
}

const server = http.createServer(handler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = handler;
