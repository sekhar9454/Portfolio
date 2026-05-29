import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getProfessor, updateProfessor } from '../controllers/professor.controller.js';

const router = express.Router();

router.get('/professor', getProfessor);
router.put('/professor/:id', authMiddleware, updateProfessor);

export default router;
