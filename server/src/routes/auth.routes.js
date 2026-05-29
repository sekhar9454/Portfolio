import express from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { login, getMe } from '../controllers/auth.controller.js';

const router = express.Router();

// Rate limit login attempts: 10 per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.get('/me', authMiddleware, getMe);

export default router;
