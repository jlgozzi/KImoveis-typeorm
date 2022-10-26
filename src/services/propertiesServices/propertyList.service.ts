import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";

const propertyListService = async () => {
  const database = AppDataSource.getRepository(Property);

  const properties = await database.find();

  return properties;
};

export default propertyListService;
