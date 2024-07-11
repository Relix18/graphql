import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const register = async (_, { name, email, password }, context) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ErrorHandler(400, "User with this email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: "3d" });
        context.res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        return { user, token };
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const logIn = async (_, { email, password }, context) => {
    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        console.log(user);
        if (!user) {
            throw new ErrorHandler(400, "User with this email does not exist");
        }
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new ErrorHandler(400, "Password is incorrect");
        }
        // Generate JWT token
        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: "3d" });
        // Set token as a cookie in the response
        context.res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure to true in production
            maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days in milliseconds
        });
        // Return user and token
        return { user, token };
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const logOut = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to logout" });
    }
};
export const getAllUsers = async () => {
    const user = await User.find();
    return user;
};
export const getUser = async (id) => {
    const user = await User.findById(id);
    console.log(user);
    return user;
};
export const authUser = async ({ user }) => {
    if (!user) {
        throw new Error("Not authenticated");
    }
    return user;
};
