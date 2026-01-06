import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service";
import { catchAsync } from "../../middlewares/error.middleware";

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
  res.json(user);
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
