import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma";
import { IUserRequest } from "../middlewares/auth";

// @Desc Get Jobs
// @Route /api/job
// @Method GET
export const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({});

  res.status(201).json(jobs);
});

// @Desc Get Single Job
// @Route /api/job/:jobId
// @Method GET
export const getSingleJob = asyncHandler(
  async (req: Request, res: Response) => {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      res.status(401);
      throw new Error("Job not found");
    }

    res.status(201).json(job);
  }
);

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

// @Desc Apply For a Job
// @Route /api/jobs/:jobId/apply
// @Method POST
export const applyJob = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    const jobExist = await prisma.job.findUnique({ where: { id: jobId } });

    if (!jobExist) {
      res.status(401);
      throw new Error("Job not found");
    }

    const checkApply = await prisma.application.findMany({
      where: {
        userId,
        jobId,
      },
    });

    if (checkApply.length > 0) {
      res.status(401);
      throw new Error("Already Applied");
    }

    const app = await prisma.application.create({
      data: {
        userId,
        jobId,
      },
    });

    res.status(201).json(app);
  }
);
