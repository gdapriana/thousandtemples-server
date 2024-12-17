import validation from "../validation/validation.js";
import StoryValidation from "../validation/story.js";
import db from "../application/database.js";
import slugify from "slugify";
import ResponseError from "../error/response.js";

class StoryService {
  static async create(req, username) {
    const request = validation(StoryValidation.CREATE, req);
    const slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.story.create({
      data: { ...request, username, slug },
      select: {
        name: true
      }
    })
  }
  static async get(slug) {
    const story = await db.story.findUnique({
      where: { slug },
      include: {
        _count: true,
        User: true,
        users_comment_stories: true,
        users_like_stories: true,
        users_save_stories: true,
        users_view_stories: true
      }});
    if (!story) throw new ResponseError(404, "story not found");
    return story;
  }
  static async gets(req) {
    const queries = validation(StoryValidation.GETS, req);
    return db.story.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
          { description: { contains: queries.description, mode: "insensitive" } },
        ],
      },
      include: {
        _count: true,
        User: true
      },
      take: queries.count,
    })
  }
  static async update(req, slug) {
    const request = validation(StoryValidation.UPDATE, req);
    if (request.name) request.slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.story.update({
      where: { slug },
      data: { ...request },
      select: {
        name: true
      }
    })
  }
  static async delete(username, slug) {
    const story = await db.story.findUnique({ where: { slug } });
    if (!story) throw new ResponseError(404, "story not found");
    if (story.username !== username) throw new ResponseError(401, "unauthorized");
    return db.story.delete({
      where: { slug },
      select: {
        name: true
      }
    })
  }
  static async comment(slug, username, body) {
    const request = validation(StoryValidation.COMMENT, body);
    const story = await db.story.findUnique({where: { slug }});
    if (!story) throw new ResponseError(404, "story not found");
    return db.users_comment_stories.create({
      data: {
        storySlug: slug,
        body: request,
        username,
      },
      select: { username: true }
    })
  }
  static async uncomment(slug, username, id) {
    const comment = await db.users_comment_stories.findUnique({
      where: { id, username, storySlug: slug }
    })
    if (!comment) throw new ResponseError(404, "comment not found");
    return db.users_comment_stories.delete({
      where: {
        id, username, storySlug: slug
      },
      select: {
        username: true,
      }
    })
  }
  static async save(slug, username) {
    const story = await db.story.findUnique({
      where: { slug },
    });
    if (!story) throw new ResponseError(404, "story not found");
    const saved = await db.users_save_stories.findFirst({
      where: {
        username,
        storySlug: slug,
      },
    });
    if (saved) throw new ResponseError(400, "story already saved");
    return db.users_save_stories.create({
      data: {
        storySlug: slug,
        username,
      },
      select: {
        story: true,
      },
    });
  }
  static async unsave(slug, username) {
    const saved = await db.users_save_stories.findFirst({
      where: {
        storySlug: slug,
        username: username,
      },
    });
    if (!saved) throw new ResponseError(400, "story not saved");
    await db.users_save_stories.deleteMany({
      where: {
        username: username,
        storySlug: slug,
      },
    });
  }
  static async like(slug, username) {
    const story = await db.story.findUnique({
      where: { slug },
    });
    if (!story) throw new ResponseError(404, "story not found");
    const liked = await db.users_like_stories.findFirst({
      where: {
        storySlug: slug,
        username,
      },
    });
    if (liked) throw new ResponseError(400, "story already liked");
    return db.users_like_stories.create({
      data: {
        storySlug: slug,
        username,
      },
      select: {
        story: true,
      },
    });
  }
  static async dislike(slug, username) {
    const story = await db.story.findUnique({
      where: { slug },
    });
    if (!story) throw new ResponseError(404, "story not found");
    const liked = await db.users_like_stories.findFirst({
      where: {
        storySlug: slug,
        username,
      },
    });
    if (!liked) throw new ResponseError(400, "story not liked");
    await db.users_like_stories.deleteMany({
      where: {
        storySlug: slug,
        username,
      },
    });
  }
  static async view(slug, username) {
    const story = await db.story.findUnique({
      where: { slug },
    });
    if (!story) throw new ResponseError(404, "story not found");
    const viewed = await db.users_view_stories.findFirst({
      where: {
        username: username,
        storySlug: slug,
      },
    });
    if (viewed) throw new ResponseError(400, "story already viewed");
    return db.users_view_stories.create({
      data: {
        username,
        storySlug: slug,
      },
      select: { story: true },
    });
  }
}

export default StoryService;