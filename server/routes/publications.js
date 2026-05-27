import express from 'express';
import Publication from '../models/Publication.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/publications — public, list all publications
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const publications = await Publication.find(filter).sort({ year: -1, createdAt: -1 });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/publications/:id — public, get single publication
router.get('/:id', async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/publications — protected, create publication
router.post('/', authMiddleware, async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/publications/:id — protected, update publication
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/publications/:id — protected, delete publication
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pub = await Publication.findByIdAndDelete(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json({ message: 'Publication deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
