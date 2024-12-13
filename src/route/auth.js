import express from "express";
import UserController from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import DestinationController from "../controller/destination.js";

const authRouter = express.Router();
authRouter.delete("/api/logout", authMiddleware, UserController.logout);

authRouter.post("/api/destinations", authMiddleware, adminMiddleware, DestinationController.create);
authRouter.patch("/api/destinations/:slug", authMiddleware, adminMiddleware, DestinationController.update);
authRouter.delete("/api/destinations/:slug", authMiddleware, adminMiddleware, DestinationController.delete);
authRouter.post("/api/destinations/:slug/comment", authMiddleware, DestinationController.comment);
authRouter.delete("/api/destinations/:slug/comment/:id", authMiddleware, DestinationController.uncomment);
authRouter.post("/api/destinations/:slug/save", authMiddleware, DestinationController.save);
authRouter.delete("/api/destinations/:slug/save", authMiddleware, DestinationController.unsave);
authRouter.post("/api/destinations/:slug/like", authMiddleware, DestinationController.like);
authRouter.delete("/api/destinations/:slug/like", authMiddleware, DestinationController.dislike);
authRouter.post("/api/destinations/:slug/view", authMiddleware, DestinationController.view);

export default authRouter;
