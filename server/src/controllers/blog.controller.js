import Blog from '../models/blog.model.js';

/**
 * GET /api/blogs
 * Returns all published blogs (or all if ?all=true).
 */
export const getAll = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/blogs/:id
 * Returns a single blog by ID.
 */
export const getById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/blogs
 * Creates a new blog post.
 */
export const create = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /api/blogs/:id
 * Updates an existing blog post.
 */
export const update = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/blogs/:id
 * Deletes a blog post.
 */
export const remove = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
