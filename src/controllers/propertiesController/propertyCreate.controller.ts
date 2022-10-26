import { Response, Request } from "express";
import propertyCreateService from "../../services/propertiesServices/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
  const { value, size, address, categoryId } = req.body;

  const property = { value, size, address, categoryId };
  const newProperty = await propertyCreateService(property);

  return res.status(201).json(newProperty);
};

export default propertyCreateController;
