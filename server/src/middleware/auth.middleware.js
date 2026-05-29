import jwt from 'jsonwebtoken';

/**
 * Returns the JWT secret, throwing if it's missing.
 * Resolved lazily so dotenv.config() has time to load first.
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('FATAL: JWT_SECRET environment variable is not set.');
  }
  return secret;
}

export function generateToken(adminId) {
  return jwt.sign({ id: adminId }, getJwtSecret(), { expiresIn: '24h' });
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
