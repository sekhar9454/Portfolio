import express from 'express';
import cors from 'cors';
import professorRoutes from './routes/professor.routes.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import publicationRoutes from './routes/publication.routes.js';

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// ── Routes ─────────────────────────────────────────────────
app.use('/api', professorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/publications', publicationRoutes);

// ── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── 404 Handler ────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Global Error Handler ───────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
});

export default app;
