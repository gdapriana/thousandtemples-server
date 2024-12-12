import express from "express";
import welcome from "../controller/welcome.js";
import UserController from "../controller/user.js";
import DestinationController from "../controller/destination.js";

const publicRouter = express.Router();
publicRouter.get("/", welcome);
publicRouter.post("/api/register", UserController.register);
publicRouter.post("/api/admin/register", UserController.registerAdmin);
publicRouter.post("/api/login", UserController.login);

publicRouter.get("/api/destinations", DestinationController.gets);
publicRouter.get("/api/destinations/:slug", DestinationController.get);

export default publicRouter;
