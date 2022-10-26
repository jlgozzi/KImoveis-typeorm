import { Request, Response } from "express";
import userDeleteService from "../../services/usersServices/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleted = await userDeleteService(id);

    if (deleted.status === 400) {
      return res.status(400).json({ message: deleted.message });
    }

    return res.status(204).json(deleted);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({ message: err.message });
    }
  }
};

export default userDeleteController;
