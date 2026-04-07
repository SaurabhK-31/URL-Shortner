const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_changeme';

function verifyToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
}

// Optional: attaches user if logged in, but doesn't block
function optionalAuth(req, res, next) {
    const token = req.cookies?.token;
    if (token) {
        try { req.user = jwt.verify(token, JWT_SECRET); } catch {}
    }
    next();
}

module.exports = { verifyToken, optionalAuth };
