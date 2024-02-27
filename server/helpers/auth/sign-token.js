const jwt = require('jsonwebtoken')

exports.signJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}