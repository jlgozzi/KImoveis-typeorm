import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";

const categoryListService = async () => {
  const database = AppDataSource.getRepository(Category);

  const categories = await database.find();

  return categories;
};

export default categoryListService;
