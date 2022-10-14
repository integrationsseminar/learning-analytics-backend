import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { UserRoles } from "../../types/user.types";
import UserController from "./user.controller";

const UserRouter = Router();

//User Routes /user
UserRouter.get("/", UserController.getUserOdatafy);
UserRouter.get("/my", authMiddleware([UserRoles.Student]), UserController.getLoggedInUser);
UserRouter.put("/my", authMiddleware([UserRoles.Student]), UserController.updateUserById);
UserRouter.delete("/:id", UserController.deleteUserById);

export default UserRouter