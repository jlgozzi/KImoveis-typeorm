import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import userUpdateService from "../../services/usersServices/userUpdate.service";
import { User } from "../../entities/user.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const pramsId = req.params.id;
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({ message: "Missing authorization token." });
    }

    const { id, isAdm, isActive } = req.body;

    if (id !== undefined || isActive !== undefined || isAdm !== undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await userUpdateService(
      authorization,
      { email, password, name },
      pramsId
    );
    console.log(updatedUser);

    if (updatedUser instanceof User) {
      return res
        .status(200)
        .json(instanceToPlain({ message: "User updated.", updatedUser }));
    }
  } catch (err) {
    if (err instanceof ErrorHTTP) {
      return res.status(err.status).json({ message: err.message });
    }
  }
};

export default userUpdateController;
