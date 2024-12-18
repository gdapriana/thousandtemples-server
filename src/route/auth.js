import express from "express";
import UserController from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import DestinationController from "../controller/destination.js";
import StoryController from "../controller/story.js";
import CultureController from "../controller/culture.js";

const authRouter = express.Router();
authRouter.patch("/api/update", authMiddleware, UserController.update);
authRouter.get("/api/users", authMiddleware, adminMiddleware, UserController.gets);
authRouter.delete("/api/logout", authMiddleware, UserController.logout);
authRouter.delete("/api/users/:username", authMiddleware, adminMiddleware, UserController.delete);

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

authRouter.post("/api/stories", authMiddleware, StoryController.create);
authRouter.patch("/api/stories/:slug", authMiddleware, StoryController.update);
authRouter.delete("/api/stories/:slug", authMiddleware, StoryController.delete);
authRouter.post("/api/stories/:slug/comment", authMiddleware, StoryController.comment);
authRouter.delete("/api/stories/:slug/comment/:id", authMiddleware, StoryController.uncomment);
authRouter.post("/api/stories/:slug/save", authMiddleware, StoryController.save);
authRouter.delete("/api/stories/:slug/save", authMiddleware, StoryController.unsave);
authRouter.post("/api/stories/:slug/like", authMiddleware, StoryController.like);
authRouter.delete("/api/stories/:slug/like", authMiddleware, StoryController.dislike);
authRouter.post("/api/stories/:slug/view", authMiddleware, StoryController.view);

authRouter.post("/api/cultures", authMiddleware, adminMiddleware, CultureController.create);
authRouter.patch("/api/cultures/:slug", authMiddleware, adminMiddleware, CultureController.update);
authRouter.delete("/api/cultures/:slug", authMiddleware, adminMiddleware, CultureController.delete);
authRouter.post("/api/cultures/:slug/comment", authMiddleware, CultureController.comment);
authRouter.delete("/api/cultures/:slug/comment/:id", authMiddleware, CultureController.uncomment);
authRouter.post("/api/cultures/:slug/save", authMiddleware, CultureController.save);
authRouter.delete("/api/cultures/:slug/save", authMiddleware, CultureController.unsave);
authRouter.post("/api/cultures/:slug/like", authMiddleware, CultureController.like);
authRouter.delete("/api/cultures/:slug/like", authMiddleware, CultureController.dislike);
authRouter.post("/api/cultures/:slug/view", authMiddleware, CultureController.view);

export default authRouter;
