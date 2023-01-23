import express from "express";
import {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.route("/").get(getJobs).post(protect, createJob);
router
  .route("/:jobId")
  .get(getSingleJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);
router.route("/:jobId/apply").post(protect, applyJob);

export default router;
