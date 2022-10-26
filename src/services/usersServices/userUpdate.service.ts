import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
import ErrorHTTP from "../../errors/ErrorHTTP";

const userUpdateService = async (
  authorization: string,
  { email, password, name }: IUserUpdate,
  id: string
) => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const token = authorization.split(" ")[1];

  const payload: any = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err, decoded) => {
      if (!decoded) {
        throw new Error("Missing authorization token.");
      }
      return decoded;
    }
  );

  const userLogged = users.find((user) => user.email === payload.email);
  const userToBeUpdated = users.find((user) => user.id === id);

  if (
    userLogged?.isAdm === false &&
    userLogged.email !== userToBeUpdated?.email
  ) {
    throw new ErrorHTTP("Not authorized.");
  }

  if (!userToBeUpdated) {
    throw new ErrorHTTP("User not found.", 404);
  }

  await database.update(id, {
    name: name ? name : userToBeUpdated.name,
    email: email ? email : userToBeUpdated.email,
    password: password ? await hash(password, 10) : userToBeUpdated.password,
    updatedAt: new Date(),
  });

  const userUpdated = await database.findOneBy({ id });

  return userUpdated;
};

export default userUpdateService;
