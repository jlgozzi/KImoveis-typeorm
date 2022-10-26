import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Address } from "../../entities/address.entity";

const propertyCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: any): Promise<Property> => {
  const databaseAddress = AppDataSource.getRepository(Address);

  const newAdress = databaseAddress.create({
    city: address.city,
    district: address.district,
    number: address.number,
    state: address.state,
    zipCode: address.zipCode,
  });

  await databaseAddress.save(newAdress);

  const database = AppDataSource.getRepository(Property);

  const newproperty = database.create({
    address: newAdress,
    size,
    sold: false,
    value,
    category: categoryId,
  });

  await database.save(newproperty);

  return newproperty;
};

export default propertyCreateService;
