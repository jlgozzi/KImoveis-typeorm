import { Router } from "express";
import propertyCreateController from "../controllers/propertiesController/propertyCreate.controller";
import propertyListController from "../controllers/propertiesController/propertyList.controller";
import userLoginController from "../controllers/userControllers/userLogin.controller";
import verifyAddressAlreadyInUseMiddleware from "../middlewares/verifyAddressAlreadyInUse.middleware";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyCategoryExistsMiddleware from "../middlewares/verifyCategoryExists.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const propertyRoutes = Router();

propertyRoutes.post(
  "/properties",
  verifyAuthTokenMiddleware,
  verifyIsAdmMiddleware,
  verifyAddressAlreadyInUseMiddleware,
  verifyCategoryExistsMiddleware,
  propertyCreateController
);
propertyRoutes.get("/properties", propertyListController);

export default propertyRoutes;
