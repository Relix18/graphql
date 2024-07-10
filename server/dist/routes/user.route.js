import express from "express";
import { getAllUsers, getUserAddress, register, } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/register", register);
router.get("/user", getAllUsers);
router.get("/addresses", getUserAddress);
export default router;
