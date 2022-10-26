import { Router } from "express";
import scheduleCreateController from "../controllers/schedulesControllers/scheduleCreate.controller";
import schedulesPropertyController from "../controllers/schedulesControllers/schedulesProperty.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";
import verifyPropertyExistsMiddleware from "../middlewares/verifyPropertyExist.middleware";
import verifyUserExistMiddleware from "../middlewares/verifyUserExist.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/schedules",
  verifyAuthTokenMiddleware,
  verifyPropertyExistsMiddleware,

  scheduleCreateController
);
scheduleRoutes.get(
  "/schedules/properties/:id",
  verifyAuthTokenMiddleware,
  verifyIsAdmMiddleware,
  schedulesPropertyController
);

export default scheduleRoutes;
