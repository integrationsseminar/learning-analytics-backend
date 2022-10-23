import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { UserRoles } from "../../types/user.types";
import UserController from "./user.controller";

const UserRouter = Router();

//User Routes /user
UserRouter.get("/", authMiddleware([UserRoles.Admin]), UserController.getUserOdatafy);
UserRouter.get("/my", authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), UserController.getLoggedInUser);
UserRouter.put("/my", authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), UserController.updateLoggedInUser);
UserRouter.delete("/:id", UserController.deleteUserById);

export default UserRouter