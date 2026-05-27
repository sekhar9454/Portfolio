import express from 'express';
import Professor from '../models/Professor.js';

const router = express.Router();

router.get('/professor', async (req, res) => {
  try {
    const professor = await Professor.findOne();
    if (!professor) return res.status(404).json({ message: 'Professor not found' });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/professor/:id', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
