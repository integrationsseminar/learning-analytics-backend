import { Router } from "express";
import AuthController from "./auth";
import PingController from "./ping";
import UserController from "./user";

const router = Router();

//Ping Routes
router.get("/ping", PingController.ping);

//Auth Routes
router.post("/auth/register", AuthController.registerStudent);
router.post("/auth/login", AuthController.login);

//User Routes
router.get("/users", UserController.getUserOdatafy);
router.get("/users/my", UserController.getLoggedInUser);
router.put("/users/my", UserController.updateUserById);
router.delete("/users/:id", UserController.deleteUserById);

export default router