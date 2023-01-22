import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma";

// @Desc Get Jobs
// @Route /api/job
// @Method GET
export const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({});

  res.status(201).json(jobs);
});

// @Desc Create Job
// @Route /api/job
// @Method POST
export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await prisma.job.create({
    data: req.body,
  });

  res.status(201).json(job);
});

// @Desc Update Job
// @Route /api/job/:jobId
// @Method PUT
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  let job = await prisma.job.findUnique({ where: { id: jobId } });

  if (!job) {
    res.status(401);
    throw new Error("Job not found");
  }

  job = await prisma.job.update({
    where: { id: jobId },
    data: req.body,
  });

  res.status(201).json(job);
});

// @Desc Delete Job
// @Route /api/job/:jobId
// @Method DELETE
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  const job = await prisma.job.findUnique({ where: { id: jobId } });

  if (!job) {
    res.status(401);
    throw new Error("Job not found");
  }

  await prisma.job.delete({ where: { id: jobId } });

  res.status(201).json({ message: "Job successfully deleted" });
});
