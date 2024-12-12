import web from "./application/web.js";
import logger from "./application/logging.js";
import dotenv from "dotenv";
dotenv.config();
web.listen(process.env.PORT, () => {
  logger.info(`app start on ${process.env.PORT}`);
});
