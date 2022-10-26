import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";

const verifyAddressAlreadyInUseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.body;

  if (address.zipCode.length !== 8 || address.state.length !== 2) {
    return res.status(400).json({ message: "ZipCode or state invalid." });
  }

  const database = AppDataSource.getRepository(Address);

  const addressess = await database.find();

  const addressExist = addressess.find((element) => {
    return (
      element.city == address.city &&
      element.district == address.district &&
      element.state == address.state &&
      element.zipCode == address.zipCode &&
      element.number == address.number
    );
  });

  if (!addressExist) {
    return next();
  }

  return res.status(400).json({ message: "Adress already in use." });
};

export default verifyAddressAlreadyInUseMiddleware;
