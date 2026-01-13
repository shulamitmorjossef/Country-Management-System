"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.generateResetToken = generateResetToken;
exports.resetUserPassword = resetUserPassword;
const user_model_1 = require("../models/user.model");
const crypto_1 = __importDefault(require("crypto"));
async function createUser(userData) {
    const defaultData = {
        ...userData,
        isAdmin: false,
        permissions: {
            canAdd: false,
            canEdit: false,
            canDelete: false,
        },
    };
    return user_model_1.User.create(defaultData);
}
async function getAllUsers() {
    return user_model_1.User.find({ isAdmin: { $ne: true } })
        .select("-password -resetPasswordToken -resetPasswordExpires");
}
async function getUserById(id) {
    return user_model_1.User.findById(id);
}
async function updateUser(id, updates) {
    return user_model_1.User.findByIdAndUpdate(id, updates, { new: true });
}
async function deleteUser(id) {
    return user_model_1.User.findByIdAndDelete(id);
}
async function loginUser(username, password) {
    const user = await user_model_1.User.findOne({ username });
    if (!user)
        return null;
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return null;
    return user;
}
async function generateResetToken(email) {
    const user = await user_model_1.User.findOne({ email });
    if (!user)
        return null;
    const token = crypto_1.default.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();
    return token;
}
async function resetUserPassword(token, newPassword) {
    const user = await user_model_1.User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
    });
    if (!user)
        return null;
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return user;
}
