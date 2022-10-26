import { Response, Request, NextFunction } from "express";

const verifyAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  return next();
};

export default verifyAuthTokenMiddleware;
