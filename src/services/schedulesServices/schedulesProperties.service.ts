import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import { SchedulesUserProperty } from "../../entities/schedules_user_properties.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";

const schedulesPropertyService = async (idProperty: string) => {
  const propertyDatabase = AppDataSource.getRepository(Property);

  const property = await propertyDatabase.findOne({
    where: {
      id: idProperty,
    },
  });
  if (!property) {
    throw new ErrorHTTP("Property not found", 404);
  }

  const schedulesDatabase = AppDataSource.getRepository(SchedulesUserProperty);

  const schedules = await schedulesDatabase.find({
    where: {
      property: {
        id: idProperty,
      },
    },
  });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", schedules);
  return { schedules: schedules };
};

export default schedulesPropertyService;
