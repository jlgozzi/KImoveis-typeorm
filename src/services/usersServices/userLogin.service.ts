import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import ErrorHTTP from "../../errors/ErrorHTTP";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new ErrorHTTP("Email or password invalid.", 401);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ErrorHTTP("Email or password invalid.", 401);
  }

  const token = jwt.sign(
    { email: email, id: user.id },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "1d",
    }
  );

  return { message: "Logged in.", token: token };
};

export default userLoginService;
