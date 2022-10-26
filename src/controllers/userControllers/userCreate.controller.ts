import { Response, Request } from "express";
import userCreateService from "../../services/usersServices/userCreate.service";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm } = req.body;

  const newUser = await userCreateService({ name, email, password, isAdm });

  return res.status(201).json(instanceToPlain(newUser));
};

export default userCreateController;
