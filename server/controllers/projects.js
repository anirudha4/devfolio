const prisma = require('../prisma/init');
const { REQUIRED_PROJECTS_FIELDS } = require('../utils/constants');
const { PROJECT_MESSAGES } = require('../utils/messages');
const { checkNullValuesInObject } = require('../utils/validation');

exports.getProjects = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const projects = await prisma.project.findMany({
            where: {
                userId
            }
        });
        return res.json({
            projects,
            counts: projects.length
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: false
        })
    }
}

exports.createProject = async (req, res, next) => {
    try {
        checkNullValuesInObject(req.body, REQUIRED_PROJECTS_FIELDS);
        const project = await prisma.project.create({
            data: {
                userId: req.user.id,
                ...req.body
            }
        });
        return res.json({
            project,
            message: PROJECT_MESSAGES.CREATE_SUCCESS,
            status: true
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}