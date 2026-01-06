import { Request, Response, NextFunction } from "express";


export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err.message || err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}
