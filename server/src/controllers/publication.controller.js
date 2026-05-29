import Publication from '../models/publication.model.js';

/**
 * GET /api/publications
 * Returns all publications, optionally filtered by ?type=journal|conference.
 */
export const getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const publications = await Publication.find(filter).sort({ year: -1, createdAt: -1 });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/publications/:id
 * Returns a single publication by ID.
 */
export const getById = async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/publications
 * Creates a new publication.
 */
export const create = async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /api/publications/:id
 * Updates an existing publication.
 */
export const update = async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/publications/:id
 * Deletes a publication.
 */
export const remove = async (req, res) => {
  try {
    const pub = await Publication.findByIdAndDelete(req.params.id);
    if (!pub) return res.status(404).json({ message: 'Publication not found.' });
    res.json({ message: 'Publication deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
