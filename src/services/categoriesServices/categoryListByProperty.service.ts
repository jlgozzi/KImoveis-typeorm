import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const categoryListByPropertyService = async (idCategory: string) => {
  const categoryDatabase = AppDataSource.getRepository(Category);

  const category = await categoryDatabase.findOne({
    where: {
      id: idCategory,
    },
  });
  if (!category) {
    throw new ErrorHTTP("Category not found", 404);
  }

  const propertyDatabase = AppDataSource.getRepository(Property);

  const properties = await propertyDatabase.find({
    where: {
      category: {
        id: idCategory,
      },
    },
  });

  return { id: category.id, name: category.name, properties: properties };
};

export default categoryListByPropertyService;
