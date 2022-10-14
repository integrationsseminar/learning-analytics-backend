import { Router } from "express";
import PingController from "./ping.controller";

const PingRouter = Router();

//Ping Routes
PingRouter.get("/", PingController.ping);

export default PingRouter