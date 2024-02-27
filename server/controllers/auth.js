const bcrypt = require('bcrypt');
const prisma = require('../prisma/init');
const { REQUIRED_USER_FIELDS, REQUIRED_USER_LOGIN_FIELDS } = require("../utils/constants");
const { AUTH_MESSAGES } = require("../utils/messages");
const { checkNullValuesInObject } = require("../utils/validation");
const { signJwtToken, getStrippedUser } = require('../helpers/auth');

// login
exports.signIn = async (req, res, next) => {
    try {
        checkNullValuesInObject(req.body, REQUIRED_USER_LOGIN_FIELDS);

        // find user with email
        const user = await prisma.user_account.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            throw new Error(AUTH_MESSAGES.INVALID_EMAIL);
        }

        // check if password is correct
        const isValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isValid) {
            throw new Error(AUTH_MESSAGES.INVALID_PASSWORD);
        }
        const strippedUser = getStrippedUser(user);

        // send token
        res.json({
            status: true,
            message: AUTH_MESSAGES.USER_LOGGED_IN(user.name),
            token: signJwtToken(strippedUser),
            user: strippedUser
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            status: false
        });
    }
};

// register
exports.signUp = async (req, res, next) => {
    try {
        checkNullValuesInObject(req.body, REQUIRED_USER_FIELDS);

        // check if user with email exists
        const exists = await prisma.user_account.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (exists) {
            throw new Error(AUTH_MESSAGES.USER_ALREADY_EXISTS(exists.email));
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // create new user
        const user = await prisma.user_account.create({
            data: {
                ...req.body,
                password: hashedPassword
            }
        });
        const strippedUser = getStrippedUser(user);

        res.status(200).json({
            message: AUTH_MESSAGES.REGISTERED,
            status: true,
            user: strippedUser,
            token: signJwtToken(strippedUser),
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            status: false,
        });
    }
};


exports.getUser = async (req, res, next) => {
    return res.json({
        user: req.user
    })
}