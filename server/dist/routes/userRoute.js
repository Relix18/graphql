import express from "express";
import { getAllUsers, getUserAddress, register, } from "../controllers/userController.js";
const router = express.Router();
router.post("/register", register);
router.get("/users", getAllUsers);
router.get("/addresses", getUserAddress);
export default router;
