"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaculty = void 0;
const models_1 = __importDefault(require("../models"));
const User_1 = require("../models/User");
const logger_1 = require("../utils/logger");
const createFaculty = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
            return;
        }
        const { userId, expertise, availability } = req.body;
        // Validation
        if (!userId) {
            res.status(400).json({
                status: 'error',
                message: 'userId is required',
            });
            return;
        }
        // Verify user exists and has faculty role
        const user = await models_1.default.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
            return;
        }
        if (user.role !== User_1.UserRole.FACULTY) {
            res.status(400).json({
                status: 'error',
                message: 'User must have faculty role. Please update user role to faculty first.',
            });
            return;
        }
        // Check if faculty profile already exists
        const existingProfile = await models_1.default.FacultyProfile.findOne({ where: { userId } });
        if (existingProfile) {
            res.status(409).json({
                status: 'error',
                message: 'Faculty profile already exists for this user',
            });
            return;
        }
        // Create faculty profile
        const facultyProfile = await models_1.default.FacultyProfile.create({
            userId,
            expertise: expertise || null,
            availability: availability || null,
        });
        // Fetch the created profile with user information
        const profileWithUser = await models_1.default.FacultyProfile.findByPk(facultyProfile.id, {
            include: [
                {
                    model: models_1.default.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'phone', 'role', 'isActive'],
                },
            ],
        });
        res.status(201).json({
            status: 'success',
            message: 'Faculty profile created successfully',
            data: {
                facultyProfile: {
                    id: profileWithUser?.id,
                    userId: profileWithUser?.userId,
                    expertise: profileWithUser?.expertise,
                    availability: profileWithUser?.availability,
                    user: profileWithUser?.user,
                    createdAt: profileWithUser?.createdAt,
                    updatedAt: profileWithUser?.updatedAt,
                },
            },
        });
    }
    catch (error) {
        logger_1.logger.error('Create faculty error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error while creating faculty profile',
        });
    }
};
exports.createFaculty = createFaculty;
//# sourceMappingURL=faculty.controller.js.map