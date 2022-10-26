import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyEmailAlreadyInUseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const database = AppDataSource.getRepository(User);

  const findEmail = await database.find();

  const emailAlreadyInUse = findEmail.find((user) => user.email === email);

  if (!emailAlreadyInUse) {
    return next();
  }

  return res.status(400).json({ message: "Email already in use." });
};

export default verifyEmailAlreadyInUseMiddleware;
