// requires
const router = require('express').Router();

const { getPortfolios, createPortfolio } = require('../controllers/portfolios');

router.get('/', getPortfolios);
router.post('/', createPortfolio);

module.exports = router;