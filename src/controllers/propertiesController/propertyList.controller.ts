import { Request, Response } from "express";
import ErrorHTTP from "../../errors/ErrorHTTP";
import propertyListService from "../../services/propertiesServices/propertyList.service";

const propertyListController = async (req: Request, res: Response) => {
  try {
    const properties = await propertyListService();

    return res.status(200).json(properties);
  } catch (err) {
    if (err instanceof ErrorHTTP) {
      return res.status(401).json({ message: err.message });
    }
  }
};

export default propertyListController;
