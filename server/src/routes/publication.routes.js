import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAll, getById, create, update, remove } from '../controllers/publication.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
