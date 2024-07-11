import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler(401, "Access Denied. No token provided."));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler(404, "User not found."));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler(400, "Invalid token."));
  }
};

export default authMiddleware;
