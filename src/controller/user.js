import UserService from "../service/user.js";
import DestinationService from "../service/destination.js";

class UserController {
  static async register(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.register(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async registerAdmin(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.registerAdmin(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async login(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.login(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req, res, next) {
    try {
      const username = req.params.username;
      const response = await UserService.get(username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async gets(req, res, next) {
    try {
      const { count, ...otherQueries } = req.query;
      if (count) {
        const parsedCount = parseInt(count, 10);
        if (isNaN(parsedCount) || parsedCount < 0) {
          return res.status(400).json({
            error: "Invalid count parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.count = parsedCount;
      }
      const response = await UserService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const request = req.body;
      const username = req.username;
      const response = await UserService.update(request, username);
      return res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async logout(req, res, next) {
    try {
      const response = await UserService.logout(req.username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const username = req.params.username;
      await UserService.delete(username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
