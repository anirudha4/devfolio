const router = require('express').Router();

const { verify } = require('../middlewares/auth');

const authRouter = require('./auth');
const portfolioRouter = require('./portfolio');
const projectRouter = require('./project');
const experienceRouter = require('./experience');

// routes
router.use('/auth', authRouter);
router.use('/portfolios', verify, portfolioRouter);
router.use('/projects', verify, projectRouter);
router.use('/experiences', verify, experienceRouter);

module.exports = router;