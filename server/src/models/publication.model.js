import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['journal', 'conference'],
    required: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    default: ''
  },
  doi: {
    type: String,
    default: ''
  },
  indexing: {
    type: String,
    default: ''
  },
  impactFactor: {
    type: String,
    default: ''
  },
  quartile: {
    type: String,
    enum: ['Q1', 'Q2', 'Q3', 'Q4', ''],
    default: ''
  },
  status: {
    type: String,
    enum: ['Published', 'Under Review', 'Under Revision', 'Accepted'],
    default: 'Published'
  },
  role: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Publication', publicationSchema);
