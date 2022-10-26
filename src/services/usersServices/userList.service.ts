import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const userListService = async () => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  return users;
};

export default userListService;
