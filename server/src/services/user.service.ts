import { User, IUser } from "../models/user.model";
import crypto from "crypto";

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

export async function loginUser(username: string, password: string) {
  const user = await User.findOne({ username });
  if (!user) return null;
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;
  return user;
}

export async function generateResetToken(email: string) {
  const user = await User.findOne({ email });
  if (!user) return null;

  // יצירת טוקן אקראי
  const token = crypto.randomBytes(20).toString("hex");
  
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // שעה אחת מתוקף

  await user.save();
  return token;
}

export async function resetUserPassword(token: string, newPassword: string) {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }, 
  });

  if (!user) return null;

  user.password = newPassword; 
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  await user.save();
  return user;
}