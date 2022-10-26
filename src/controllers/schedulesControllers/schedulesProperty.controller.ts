import { Request, Response } from "express";
import ErrorHTTP from "../../errors/ErrorHTTP";
import schedulesPropertyService from "../../services/schedulesServices/schedulesProperties.service";

const schedulesPropertyController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const schedules = await schedulesPropertyService(id);

    return res.status(200).json(schedules);
  } catch (err) {
    if (err instanceof ErrorHTTP) {
      return res.status(err.status).json({ message: err.message });
    }
  }
};

export default schedulesPropertyController;
