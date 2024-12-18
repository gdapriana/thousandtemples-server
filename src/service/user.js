import bcrypt from "bcrypt";
import validation from "../validation/validation.js";
import UserValidation from "../validation/user.js";
import ResponseError from "../error/response.js";
import db from "../application/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserService {
  static async register(req) {
    const request = validation(UserValidation.REGISTER, req);
    const usernameUsed = await db.user.findUnique({ where: { username: request.username } });
    if (usernameUsed) throw new ResponseError(400, "user already exists");
    request.password = await bcrypt.hash(request.password, 10);
    return db.user.create({
      data: request,
      select: { username: true },
    });
  }
  static async registerAdmin(req) {
    const request = validation(UserValidation.REGISTER, req);
    const usernameUsed = await db.user.findUnique({ where: { username: request.username } });
    if (usernameUsed) throw new ResponseError(400, "user already exists");
    request.password = await bcrypt.hash(request.password, 10);
    return db.user.create({
      data: { ...request, role: "ADMIN" },
      select: { username: true },
    });
  }
  static async login(req) {
    const request = validation(UserValidation.LOGIN, req);
    const user = await db.user.findUnique({ where: { username: request.username } });
    if (!user) throw new ResponseError(401, "username or pasword wrong");
    if (!(await bcrypt.compare(request.password, user.password)))
      throw new ResponseError(401, "username or pasword wrong");
    const token = jwt.sign({ username: request.username, id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "3600s",
    });
    return db.user.update({
      where: { username: request.username },
      data: { token },
      select: {
        token: true,
        username: true,
      },
    });
  }

  static async get(username) {
    const user = await db.user.findUnique({
      where: { username },
      include: {
        _count: true,
        stories: true,
        users_save_cultures: true,
        users_save_destinations: true,
        users_save_stories: true,
      }
    });
    if (!user) throw new ResponseError(404, "user not found");
    return user;
  }

  static async update(req, username) {
    const request = validation(UserValidation.UPDATE, req);
    const user = await db.user.findUnique({where: {username}})
    if (!user) throw new ResponseError(401, "user not found");
    return db.user.update({
      where: { username },
      data:  request,
      select: {
        username: true
      }
    })
  }
  static async logout(username) {
    const user = await db.user.findUnique({ where: { username } });
    if (!user) throw new ResponseError(404, "user not found");
    return db.user.update({
      where: { username },
      data: { token: null },
      select: { username: true },
    });
  }
}

export default UserService;
