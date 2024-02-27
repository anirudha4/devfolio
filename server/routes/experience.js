// requires
const router = require('express').Router();

const { getExperiences, createExperience } = require('../controllers/experiences');

router.get('/', getExperiences);
router.post('/', createExperience);

module.exports = router;