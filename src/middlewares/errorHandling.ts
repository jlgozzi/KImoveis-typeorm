import { Response, Request, NextFunction } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";

const errorHandlingMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ErrorHTTP) {
    return res.status(error.status).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandlingMiddleware;
