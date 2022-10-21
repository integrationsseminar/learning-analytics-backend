import { Router } from "express";
import AuthController from "./auth.controller";

const AuthRouter = Router();

//Auth Routes
AuthRouter.post("/register/:id", AuthController.registerStudent);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/login/:id", AuthController.loginWithCourseAssignment);

export default AuthRouter;