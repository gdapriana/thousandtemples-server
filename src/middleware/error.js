import { ZodError } from "zod";
import ResponseError from "../error/response.js";

const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: `validation error ${JSON.stringify(err)}`,
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};

export default errorMiddleware;
