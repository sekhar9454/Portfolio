import express from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  login,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword
} from '../controllers/auth.controller.js';

const router = express.Router();

// Rate limit login attempts: 10 per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many login attempts. Please try again after 15 minutes.' });
  },
});

// Rate limit forgot-password: 5 per 15 minutes per IP
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many reset attempts. Please try again after 15 minutes.' });
  },
});

// Rate limit OTP verification: 5 per 15 minutes per IP
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many verification attempts. Please try again after 15 minutes.' });
  },
});

router.post('/login', loginLimiter, login);
router.get('/me', authMiddleware, getMe);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
