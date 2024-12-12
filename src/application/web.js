import express from "express";
import cors from "cors";
import errorMiddleware from "../middleware/error.js";
import publicRouter from "../route/public.js";
import authRouter from "../route/auth.js";

const web = express();
web.use(express.json());
web.use(cors());
web.use(publicRouter);
web.use(authRouter);
web.use(errorMiddleware);

export default web;
