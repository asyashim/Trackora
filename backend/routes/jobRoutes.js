
import express from "express";
import { getJobs,createJob,deleteJob,updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/",createJob);
router.delete("/:id",deleteJob);
router.put("/:id",updateJob);

export default router;
