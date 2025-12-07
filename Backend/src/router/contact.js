import express from "express";
import { sendContactEmail } from "../controllers/contactController.js";
const router = express.Router();

router.post("/sendEmail", sendContactEmail);

export const contactRouter = router;
