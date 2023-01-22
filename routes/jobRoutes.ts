import express from "express";
import {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);
router.route("/:jobId").get(getSingleJob).put(updateJob).delete(deleteJob);

export default router;
