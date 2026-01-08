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
  res.json(updated);
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ message: "Deleted" });
});

// export const login = catchAsync(async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = await loginUser(username, password);

//   if (!user) {
//     return res.status(401).json({ message: MESSAGES.WRONG_CREDENTIALS });
//   }

//   // const userData = user.toObject();
//   // delete userData.password;
//   res.json({
//     message: MESSAGES.LOGIN_SUCCESS,
//     // user: userData,
//     user,
//     token: generateToken(user._id.toString()),
//   });
// });

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