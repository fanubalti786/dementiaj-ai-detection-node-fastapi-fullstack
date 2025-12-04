import express from "express";
import {
  getUserForPortfolio,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
  forgetPassword,
  resetPassword,
  getAllUsers,
  getAnalyses,
  addAnalysicsDementaiaData,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/all", isAuthenticated, getAllUsers);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forget/password", isAuthenticated, forgetPassword);
router.put("/password/reset/:token", isAuthenticated, resetPassword);
router.post("/analyses/add", isAuthenticated, addAnalysicsDementaiaData);
router.get("/analyses/get", isAuthenticated, getAnalyses);

export const userRouter = router;
