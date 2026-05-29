/**
 * Emergency CLI tool to reset the admin password directly.
 *
 * Usage:
 *   node reset-admin-password.js <new-password>
 *
 * Requires MONGODB_URI in .env
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/admin.model.js';

dotenv.config();

const newPassword = process.argv[2];

if (!newPassword) {
  console.error('❌ Usage: node reset-admin-password.js <new-password>');
  console.error('   Example: node reset-admin-password.js MyNewSecurePass123');
  process.exit(1);
}

if (newPassword.length < 6) {
  console.error('❌ Password must be at least 6 characters long.');
  process.exit(1);
}

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = await Admin.findOne();
    if (!admin) {
      console.error('❌ No admin user found in the database. Run "npm run seed" first.');
      process.exit(1);
    }

    admin.passwordHash = await Admin.hashPassword(newPassword);
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    await admin.save();

    console.log(`✅ Password reset successfully for admin "${admin.username}".`);
    console.log('   You can now sign in with the new password.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

resetPassword();
