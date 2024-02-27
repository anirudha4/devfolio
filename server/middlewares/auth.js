const { AUTH_MESSAGES } = require('../utils/messages');
const { verifyToken, getStrippedUser } = require('../helpers/auth');
const prisma = require('../prisma/init');
const _ = require('lodash');
exports.verify = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error(AUTH_MESSAGES.NO_TOKEN_PRESENT_IN_REQUEST_HEADERS);
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error(AUTH_MESSAGES.NO_TOKEN_PRESENT_IN_REQUEST_HEADERS);
        }
        const decoded = await verifyToken(token);

        if (!decoded) {
            throw new Error(AUTH_MESSAGES.INVALID_TOKEN);
        }

        let user = await prisma.user_account.findUnique({
            where: { id: decoded.id }
        });

        if (_.isEmpty(user)) {
            throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
        }
        req.user = getStrippedUser(user);
        next();
    } catch (err) {
        res.status(400).json({
            error: err.message,
            status: false
        });
    }
}