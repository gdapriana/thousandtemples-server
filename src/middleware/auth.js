import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../application/database.js";
dotenv.config();
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ errors: "Unauthorized" });
      const user = await db.user.findFirst({ where: { token } });
      if (!user) return res.status(401).json({ errors: "Unauthorized" });
      if (user.username !== decoded.username) return res.status(401).json({ errors: "Unauthorized" });
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    });
  } else {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  }
};
export default authMiddleware;
