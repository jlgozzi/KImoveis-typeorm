import { Response, Request, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import jwt, { decode } from "jsonwebtoken";
import ErrorHTTP from "../errors/ErrorHTTP";

const verifyUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new ErrorHTTP("missing authorization token.");
  }

  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const token = authorization.split(" ")[1];

  const payload: any = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err, decoded) => {
      if (!decoded) {
        return res.status(401).json({ message: "Not authorized." });
      }
      return decoded;
    }
  );

  const exists = users.find((user) => user.email === payload.email);

  if (!exists) {
    return res.status(404).json({ message: "User not found." });
  }

  return next();

  //   return res.status(400).json({ message: "Email already in use." });
};

export default verifyUserExistMiddleware;
