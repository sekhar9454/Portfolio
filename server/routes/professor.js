import express from 'express';
import Professor from '../models/Professor.js';
import { authMiddleware } from '../middleware/auth.js';
import Publication from '../models/Publication.js';

const router = express.Router();

router.get('/professor', async (req, res) => {
  try {
    const professorDoc = await Professor.findOne();
    if (!professorDoc) return res.status(404).json({ message: 'Professor not found' });
    
    const professor = professorDoc.toObject();
    
    // Fetch all publications sorted by year descending
    const publications = await Publication.find().sort({ year: -1, createdAt: -1 });
    
    const journals = publications.filter(p => p.type === 'journal');
    const conferences = publications.filter(p => p.type === 'conference');
    
    professor.journalPublications = journals.map((pub, index) => ({
      _id: pub._id,
      id: `J${index + 1}`,
      title: pub.title,
      journal: pub.venue,
      year: pub.year,
      doi: pub.doi,
      indexing: pub.indexing,
      impactFactor: pub.impactFactor,
      quartile: pub.quartile
    }));
    
    professor.conferencePublications = conferences.map((pub, index) => ({
      _id: pub._id,
      id: `C${index + 1}`,
      title: pub.title,
      conference: pub.venue,
      role: pub.role,
      status: pub.status,
      year: pub.year
    }));
    
    res.json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/professor/:id', authMiddleware, async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
