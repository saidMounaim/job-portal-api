import express from "express";
import { getJobs, createJob, updateJob } from "../controllers/jobController";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);
router.route("/:jobId").put(updateJob);

export default router;
