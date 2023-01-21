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
