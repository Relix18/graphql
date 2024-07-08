import { NextFunction, Request, Response } from "express";
import { Address, User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, avatar } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      avatar,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(error.message);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.find();
  return user;
};

export const getUserAddress = async () => {
  const address = await Address.find();
  return address;
};

export const getUser = async (id: string) => {
  return await User.findById(id);
};
