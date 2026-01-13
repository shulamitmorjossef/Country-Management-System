"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const user_service_1 = require("../services/user.service");
const error_middleware_1 = require("../../middlewares/error.middleware");
const constant_1 = require("../../utils/constant");
const generateToken_1 = require("../../utils/generateToken");
const mapUser_1 = require("../../utils/mapUser");
const emailService_1 = require("../../utils/emailService");
exports.create = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const user = await (0, user_service_1.createUser)(req.body);
    res.status(201).json(user);
});
exports.getAll = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const users = await (0, user_service_1.getAllUsers)();
    res.json(users.map(mapUser_1.toFrontUser));
});
exports.getOne = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const user = await (0, user_service_1.getUserById)(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json((0, mapUser_1.toFrontUser)(user));
});
exports.update = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const updates = { ...req.body };
    if (req.file) {
        updates.profilePicture = `/uploads/${req.file.filename}`;
    }
    const updated = await (0, user_service_1.updateUser)(req.params.id, updates);
    if (!updated) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json((0, mapUser_1.toFrontUser)(updated));
});
exports.remove = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const deleted = await (0, user_service_1.deleteUser)(req.params.id);
    if (!deleted) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json({ message: "Deleted" });
});
exports.login = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const { username, password } = req.body;
    const user = await (0, user_service_1.loginUser)(username, password);
    if (!user) {
        return res.status(401).json({ message: constant_1.MESSAGES.WRONG_CREDENTIALS });
    }
    res.json({
        message: constant_1.MESSAGES.LOGIN_SUCCESS,
        user: (0, mapUser_1.toFrontUser)(user),
        token: (0, generateToken_1.generateToken)(user._id.toString()),
    });
});
exports.forgotPassword = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const { email } = req.body;
    const token = await (0, user_service_1.generateResetToken)(email);
    if (!token) {
        return res.status(404).json({ message: "User not found" });
    }
    await (0, emailService_1.sendResetEmail)(email, token);
    res.json({ message: "Reset email sent" });
});
exports.resetPassword = (0, error_middleware_1.catchAsync)(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await (0, user_service_1.resetUserPassword)(token, password);
    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
    res.json({ message: "Password updated successfully" });
});
