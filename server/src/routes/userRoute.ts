import express from "express";
import {
  getAllUsers,
  logOut,
  register,
} from "../controllers/userController.js";

const router = express.Router();

// router.post("/register", register);
router.get("/logout", logOut);

export default router;
