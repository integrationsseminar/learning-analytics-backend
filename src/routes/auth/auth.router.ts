import { Router } from "express";
import AuthController from "./auth.controller";

const AuthRouter = Router();

//Auth Routes
AuthRouter.post("/register", AuthController.registerStudent);
AuthRouter.post("/login", AuthController.login);

export default AuthRouter;