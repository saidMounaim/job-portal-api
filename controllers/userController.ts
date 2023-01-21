import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

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

// @Desc Login User
// @Route /api/user/login
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const passwordMatching = bcrypt.compareSync(password, user.password);

  if (user && !passwordMatching) {
    res.status(401);
    throw new Error("Password incorrect");
  }

  const userLogin = {
    id: user.id,
    name: user.name,
    email: user.email,
    resume: user.resume,
    isAdmin: user.isAdmin,
    token: generateToken(user.id),
  };

  res.status(201).json(userLogin);
});
