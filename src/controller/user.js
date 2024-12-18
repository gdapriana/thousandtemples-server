import UserService from "../service/user.js";

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
  static async logout(req, res, next) {
    try {
      const response = await UserService.logout(req.username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
