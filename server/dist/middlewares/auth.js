import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
export const authMiddleware = async ({ req, res }) => {
    const token = req.cookies.token;
    if (!token) {
        return { req, res };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return { req, res };
        }
        return { req, res, user: req.user };
    }
    catch (error) {
        return { req, res };
    }
};
