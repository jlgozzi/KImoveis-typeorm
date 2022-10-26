import { Router } from "express";
import categoryCreateController from "../controllers/categoriesController/categoryCreate.controller";
import categoryListController from "../controllers/categoriesController/categoryList.controller";
import categoryListByPropertyController from "../controllers/categoriesController/categoryListByProperty.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyCategoryExistsMiddleware from "../middlewares/verifyCategoryExists.middleware";
import verifyCategoryNameAlreadyInUseMiddleware from "../middlewares/verifyCategoryNameAlreadyInUse.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
  "/categories",
  verifyAuthTokenMiddleware,
  verifyIsAdmMiddleware,
  verifyCategoryNameAlreadyInUseMiddleware,
  categoryCreateController
);
categoryRoutes.get("/categories", categoryListController);
categoryRoutes.get(
  "/categories/:id/properties/",

  categoryListByPropertyController
);

export default categoryRoutes;
