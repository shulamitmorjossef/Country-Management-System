import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../services/user.service";
import { catchAsync } from "../../middlewares/error.middleware";
import { MESSAGES } from "../../utils/constant";
import { generateToken } from "../../utils/generateToken";
import { toFrontUser } from "../../utils/mapUser";
import { User } from "../models/user.model";
import { sendResetEmail } from "../../utils/emailService";
import crypto from "crypto"



export const create = catchAsync(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
});

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(toFrontUser(user));
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const updated = await updateUser(req.params.id, req.body);
  if (!updated) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(toFrontUser(updated));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ message: "Deleted" });
});


export const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await loginUser(username, password);

  if (!user) {
    return res.status(401).json({ message: MESSAGES.WRONG_CREDENTIALS });
  }

  res.json({
    message: MESSAGES.LOGIN_SUCCESS,
    user: toFrontUser(user),
    token: generateToken(user._id.toString()),
  });
});

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // שעה אחת

  await user.save();
  await sendResetEmail(user.email, token);

  res.json({ message: "Reset email sent" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = password; // ה-Hook במודל כבר יצפין אותה
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.json({ message: "Password updated successfully" });
};