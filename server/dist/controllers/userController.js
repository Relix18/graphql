import { Address, User } from "../models/userModel.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
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
    }
    catch (error) {
        return next(error.message);
    }
};
export const getAllUsers = async (req, res, next) => {
    const user = await User.find();
    return user;
};
export const getUserAddress = async () => {
    const address = await Address.find();
    return address;
};
export const getUser = async (id) => {
    return await User.findById(id);
};
