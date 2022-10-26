import { Response, Request } from "express";
import categoryCreateService from "../../services/categoriesServices/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await categoryCreateService(name);

  return res.status(201).json(newCategory);
};

export default categoryCreateController;
