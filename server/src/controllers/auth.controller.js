import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { sendResetOTP } from '../services/email.service.js';

/**
 * POST /api/auth/login
 * Validates credentials and returns a JWT token.
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(admin._id);
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated admin's profile.
 */
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-passwordHash -resetOtp -resetOtpExpiry');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Password Reset Flow ────────────────────────────────────────────

/**
 * POST /api/auth/forgot-password
 * Generates a 6-digit OTP, stores its bcrypt hash, and emails it.
 */
export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required.' });
    }

    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      // Return a generic success to avoid user-enumeration attacks
      return res.json({ message: 'If the account exists, an OTP has been sent to the registered email.' });
    }

    if (!admin.email) {
      return res.status(400).json({ message: 'No email address is associated with this account. Contact the system administrator.' });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash the OTP before storing (never store plaintext)
    const hashedOtp = await bcrypt.hash(otp, 10);

    admin.resetOtp = hashedOtp;
    admin.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await admin.save();

    // Send the OTP via email
    await sendResetOTP(admin.email, otp);

    // Mask the email for the client (a****@gmail.com)
    const [localPart, domain] = admin.email.split('@');
    const maskedEmail = localPart[0] + '****@' + domain;

    res.json({
      message: `OTP sent to ${maskedEmail}`,
      maskedEmail
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};

/**
 * POST /api/auth/verify-otp
 * Validates the OTP and returns a short-lived reset token.
 */
export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;

    if (!username || !otp) {
      return res.status(400).json({ message: 'Username and OTP are required.' });
    }

    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin || !admin.resetOtp || !admin.resetOtpExpiry) {
      return res.status(400).json({ message: 'No pending OTP found. Please request a new one.' });
    }

    // Check expiry
    if (new Date() > admin.resetOtpExpiry) {
      admin.resetOtp = null;
      admin.resetOtpExpiry = null;
      await admin.save();
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Compare OTP hash
    const isValid = await bcrypt.compare(otp, admin.resetOtp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Clear the OTP (single-use)
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    await admin.save();

    // Issue a short-lived reset token (5 minutes)
    const resetToken = jwt.sign(
      { adminId: admin._id, purpose: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    res.json({ resetToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: 'Verification failed. Please try again.' });
  }
};

/**
 * POST /api/auth/reset-password
 * Accepts the reset token and a new password.
 */
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: 'Reset token and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ message: 'Invalid or expired reset token. Please start over.' });
    }

    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Hash and save the new password
    admin.passwordHash = await Admin.hashPassword(newPassword);
    await admin.save();

    res.json({ message: 'Password reset successfully. You can now sign in with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Password reset failed. Please try again.' });
  }
};
