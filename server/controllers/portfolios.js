const prisma = require('../prisma/init');
const { REQUIRED_PORTFOLIO_FIELDS } = require('../utils/constants');
const { PORTFOLIO_MESSAGES } = require('../utils/messages');
const { checkNullValuesInObject } = require('../utils/validation');

exports.getPortfolios = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const portfolios = await prisma.portfolio.findMany({
            where: {
                userId
            },
            include: {
                projects: true,
                experience: true
            }
        });
        return res.json({
            portfolios,
            counts: portfolios.length
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: false
        })
    }
}

exports.createPortfolio = async (req, res, next) => {
    try {
        checkNullValuesInObject(req.body, REQUIRED_PORTFOLIO_FIELDS);
        const { projectId, experienceId, ...body } = req.body;
        const portfolio = await prisma.portfolio.create({
            data: {
                userId: req.user.id,
                ...body
            },
        });
        // connect project id present
        if (projectId) {
            await prisma.portfolio.update({
                data: {
                    projects: {
                        connect: {
                            id: projectId
                        }
                    }
                },
                where: {
                    id: portfolio.id
                }
            })
        }
        // connect experience id present
        if (experienceId) {
            await prisma.portfolio.update({
                data: {
                    experience: {
                        connect: {
                            id: experienceId
                        }
                    }
                },
                where: {
                    id: portfolio.id
                }
            })
        }
        return res.json({
            portfolio,
            message: PORTFOLIO_MESSAGES.CREATE_SUCCESS,
            status: true
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}