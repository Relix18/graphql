import express from "express";
import { logOut, } from "../controllers/userController.js";
const router = express.Router();
// router.post("/register", register);
router.get("/logout", logOut);
export default router;
