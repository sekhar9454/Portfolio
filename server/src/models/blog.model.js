import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'Dr. Ambairam Muthu Sivakrishna'
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Auto-generate excerpt from content if not provided
blogSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...';
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
