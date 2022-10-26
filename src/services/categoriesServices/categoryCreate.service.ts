import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";

const categoryCreateService = async (name: string) => {
  const database = AppDataSource.getRepository(Category);

  const newCategory = database.create({
    name: name,
  });

  await database.save(newCategory);

  return newCategory;
};

export default categoryCreateService;
