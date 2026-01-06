import { User, IUser } from "../models/user.model";

export async function createUser(userData: Partial<IUser>) {
  const defaultData = {
    ...userData,
    isAdmin: false,
    permissions: {
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
  };
  return User.create(userData);
}

export async function getAllUsers() {
  return User.find({});
}

export async function getUserById(id: string) {
  return User.findById(id);
}

export async function updateUser(id: string, updates: Partial<IUser>) {
  return User.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}
