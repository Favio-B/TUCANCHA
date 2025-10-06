import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5000';

app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Proxy all API routes to Flask backend
app.use(
  '/api',
  createProxyMiddleware({
    target: FLASK_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    },
    logLevel: 'warn'
  })
);

// Legacy form posts (kept for compatibility with Flask routes)
app.use(
  ['/login', '/submit_reservation'],
  createProxyMiddleware({ target: FLASK_URL, changeOrigin: true })
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Node gateway listening on http://localhost:${PORT} -> ${FLASK_URL}`);
});


