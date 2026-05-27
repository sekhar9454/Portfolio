import express from 'express';
import Blog from '../models/Blog.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/blogs — public, list all published blogs (or all if admin)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/blogs/:id — public, get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/blogs — protected, create blog
router.post('/', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/blogs/:id — protected, update blog
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/blogs/:id — protected, delete blog
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
