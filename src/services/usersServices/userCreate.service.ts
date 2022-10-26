import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const database = AppDataSource.getRepository(User);

  const hashedPassword = await hash(password, 10);

  const newUser = database.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await database.save(newUser);

  return newUser;
};

export default userCreateService;
