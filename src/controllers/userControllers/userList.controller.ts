import { Request, Response } from "express";
import userListService from "../../services/usersServices/userList.service";
import { instanceToPlain } from "class-transformer";

const userListController = async (req: Request, res: Response) => {
  try {
    const users = await userListService();

    return res.status(200).json(instanceToPlain(users));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ message: err.message });
    }
  }
};

export default userListController;
