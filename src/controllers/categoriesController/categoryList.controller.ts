import { Request, Response } from "express";
import ErrorHTTP from "../../errors/ErrorHTTP";
import categoryListService from "../../services/categoriesServices/categoryList.service";

const categoryListController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryListService();

    return res.status(200).json(categories);
  } catch (err) {
    if (err instanceof ErrorHTTP) {
      return res.status(401).json({ message: err.message });
    }
  }
};

export default categoryListController;
