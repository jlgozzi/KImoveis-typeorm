import { Response, Request } from "express";
import propertyCreateService from "../../services/propertiesServices/propertyCreate.service";
import scheduleCreateService from "../../services/schedulesServices/scheduleCreate.service";

const scheduleCreateController = async (req: Request, res: Response) => {
  const { userId, propertyId, date, hour } = req.body;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json("Not authorized.");
  }

  const schedule = { userId, propertyId, date, hour };
  const newSchedule = await scheduleCreateService(schedule, token);

  return res.status(201).json(newSchedule);
};

export default scheduleCreateController;
