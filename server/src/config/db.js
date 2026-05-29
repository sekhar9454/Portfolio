import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGODB_URI environment variable.
 * Exits the process on connection failure to prevent running without a DB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
