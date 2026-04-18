const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    // If no token, return 401
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Attach user information to request object
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;