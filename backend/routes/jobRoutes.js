
import express from "express";
import { getJobs,createJob,deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/",createJob);
router.delete("/:id",deleteJob)

export default router;
