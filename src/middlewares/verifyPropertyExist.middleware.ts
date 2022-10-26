import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Property } from "../entities/properties.entity";

const verifyPropertyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { propertyId } = req.body;

  const database = AppDataSource.getRepository(Property);

  const findProperty = await database.find();

  const PropertyExists = findProperty.find(
    (property) => property.id === propertyId
  );

  if (!PropertyExists) {
    return res.status(404).json({ message: "Property not found." });
  }
  return next();
};

export default verifyPropertyExistsMiddleware;
