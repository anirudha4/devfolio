const prisma = require('../prisma/init');
const { REQUIRED_EXPERIENCE_FIELDS } = require('../utils/constants');
const { EXPERIENCE_MESSAGES } = require('../utils/messages');
const { checkNullValuesInObject } = require('../utils/validation');

exports.getExperiences = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const experiences = await prisma.experience.findMany({
            where: {
                userId
            }
        });
        return res.json({
            experiences,
            counts: experiences.length
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: false
        })
    }
}

exports.createExperience = async (req, res, next) => {
    try {
        checkNullValuesInObject(req.body, REQUIRED_EXPERIENCE_FIELDS);
        const experience = await prisma.experience.create({
            data: {
                userId: req.user.id,
                ...req.body
            }
        });
        return res.json({
            experience,
            message: EXPERIENCE_MESSAGES.CREATE_SUCCESS,
            status: true
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}