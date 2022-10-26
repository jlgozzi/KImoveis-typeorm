import { Response, Request } from "express";
import userLoginService from "../../services/usersServices/userLogin.service";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await userLoginService({ email, password });

    return res.status(200).json(login);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).json({ message: err.message });
    }
  }
};

export default userLoginController;
