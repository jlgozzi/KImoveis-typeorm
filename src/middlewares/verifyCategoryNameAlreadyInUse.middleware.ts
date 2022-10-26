import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Category } from "../entities/categories.entity";
import { User } from "../entities/user.entity";

const verifyCategoryNameAlreadyInUseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  const database = AppDataSource.getRepository(Category);

  const findName = await database.find();

  const NameAlreadyInUse = findName.find((category) => category.name === name);

  if (!NameAlreadyInUse) {
    return next();
  }

  return res.status(400).json({ message: "Name already in use." });
};

export default verifyCategoryNameAlreadyInUseMiddleware;
