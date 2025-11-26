import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addBlogs,
  getAllBlogs,
  togglePublished,
} from "../controllers/blogsController.js";
const router = express.Router();
router.post("/add", isAuthenticated, addBlogs);
router.post("/toggle-published/:id", isAuthenticated, togglePublished);
router.get("/get-all", isAuthenticated, getAllBlogs);
export const blogsRouter = router;
