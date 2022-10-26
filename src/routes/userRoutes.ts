import { Router } from "express";
import userCreateController from "../controllers/userControllers/userCreate.controller";
import userDeleteController from "../controllers/userControllers/userDelete.controller";
import userListController from "../controllers/userControllers/userList.controller";
import userUpdateController from "../controllers/userControllers/userUpdate.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyEmailAlreadyInUseMiddleware from "../middlewares/verifyEmailAlreadyInUse.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const userRoutes = Router();

// users routes
userRoutes.post(
  "/users",
  verifyEmailAlreadyInUseMiddleware,
  userCreateController
);
userRoutes.get(
  "/users",
  verifyAuthTokenMiddleware,
  verifyIsAdmMiddleware,
  userListController
);
userRoutes.patch(
  "/users/:id",
  verifyAuthTokenMiddleware,
  verifyEmailAlreadyInUseMiddleware,
  userUpdateController
);
userRoutes.delete(
  "/users/:id",
  verifyAuthTokenMiddleware,
  verifyIsAdmMiddleware,
  userDeleteController
);

export default userRoutes;
