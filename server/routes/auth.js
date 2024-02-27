// requires
const router = require('express').Router();

const { signIn, signUp, getUser } = require('../controllers/auth');
const { verify } = require('../middlewares/auth');

// routes
router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.get('/me', verify, getUser);

module.exports = router;