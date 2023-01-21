import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";

// @Desc Register User
// @Route /api/user/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const userExist = await prisma.user.findUnique({ where: { email } });

  if (userExist) {
    res.status(401);
    throw new Error("Email already exist");
  }

  const passwordHasing = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHasing,
    },
  });

  res.status(201).json(user);
});
