import { Router } from "express";
import UserController from "./user.controller";

const UserRouter = Router();

//User Routes /user
UserRouter.get("/", UserController.getUserOdatafy);
UserRouter.get("/my", UserController.getLoggedInUser);
UserRouter.put("/my", UserController.updateUserById);
UserRouter.delete("/:id", UserController.deleteUserById);

export default UserRouter