const jwt = require('jsonwebtoken')

// verify token from email
exports.verifyToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return false;
    }
}