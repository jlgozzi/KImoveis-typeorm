import { Request, Response } from "express";
import ErrorHTTP from "../../errors/ErrorHTTP";
import categoryListByPropertyService from "../../services/categoriesServices/categoryListByProperty.service";

const categoryListByPropertyController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const category = await categoryListByPropertyService(id);

    return res.status(200).json(category);
  } catch (err) {
    if (err instanceof ErrorHTTP) {
      return res.status(err.status).json({ message: err.message });
    }
  }
};

export default categoryListByPropertyController;
