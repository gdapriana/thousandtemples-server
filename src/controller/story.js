import StoryService from "../service/story.js";

class StoryController {
  static async create(req, res, next) {
    try {
      const request = req.body;
      const response = await StoryService.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req, res, next) {
    try {
      const request = req.params.slug;
      console.log(request);
      const response = await StoryService.get(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
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
      const response = await StoryService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const request = req.body;
      const slug = req.params.slug;
      const response = await StoryService.update(slug, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const request = req.params.slug;
      const response = await StoryService.delete(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async comment(req, res, next) {
    try {
      const { body } = req.body;
      const slug = req.params.slug;
      const response = await StoryService.comment(slug, req.username, body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async uncomment(req, res, next) {
    try {
      const slug = req.params.slug;
      const id = req.params.id;
      const response = await StoryService.uncomment(slug, req.username, id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async save(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await StoryService.save(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async unsave(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await StoryService.unsave(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async like(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await StoryService.like(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async dislike(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await StoryService.dislike(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async view(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await StoryService.view(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
export default StoryController;