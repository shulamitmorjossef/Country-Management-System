import { IUser } from "../src/models/user.model";

export function toFrontUser(user: IUser) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    profilePicture: user.profilePicture,
    isAdmin: user.isAdmin,
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
