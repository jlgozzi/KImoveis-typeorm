import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const userDeleteService = async (id: string) => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new ErrorHTTP("User not found.");
  }

  if (user.isActive === false) {
    return { status: 400, message: "User not found." };
  }

  await database.update(id, {
    isActive: false,
  });

  //   await database.softDelete(id);

  return { message: "User deleted." };
};
export default userDeleteService;
