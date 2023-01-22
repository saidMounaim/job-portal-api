import express from "express";
import { getJobs, createJob } from "../controllers/jobController";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);

export default router;
