import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Instance method to compare password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static method to hash password
adminSchema.statics.hashPassword = async function(plainPassword) {
  return bcrypt.hash(plainPassword, 12);
};

export default mongoose.model('Admin', adminSchema);
