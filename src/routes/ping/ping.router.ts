import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { UserRoles } from "../../types/user.types";
import PingController from "./ping.controller";

const PingRouter = Router();

//Ping Routes
PingRouter.get("/",authMiddleware([UserRoles.Student]) ,PingController.ping);

export default PingRouter