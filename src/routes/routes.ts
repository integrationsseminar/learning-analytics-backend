import { Router } from "express";
import PingController from "./ping";

const router = Router();

//Ping Routes
router.get("/ping", PingController.ping)

export default router