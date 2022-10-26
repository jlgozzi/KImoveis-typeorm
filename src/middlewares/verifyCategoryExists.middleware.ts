import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Category } from "../entities/categories.entity";

const verifyCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.body;

  const database = AppDataSource.getRepository(Category);

  const findName = await database.find();

  const NameAlreadyInUse = findName.find(
    (category) => category.id === categoryId
  );

  if (!NameAlreadyInUse) {
    return res.status(404).json({ message: "Category not found." });
  }
  return next();
};

export default verifyCategoryExistsMiddleware;
