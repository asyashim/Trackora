
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";
import { uploadResume ,getResumes , deleteResume } from "../controllers/resumeController.js";

const router = express.Router();

// Protect all resume routes
router.use(authMiddleware);

// Upload resume
router.post("/upload", upload.single("resume"), uploadResume);
router.get("/", getResumes);
router.delete("/:id", deleteResume);

export default router;
