"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFrontUser = toFrontUser;
function toFrontUser(user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin,
        permissions: user.permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
