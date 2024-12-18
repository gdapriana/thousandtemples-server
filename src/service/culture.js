import validation from "../validation/validation.js";
import DestinationValidation from "../validation/destination.js";
import slugify from "slugify";
import db from "../application/database.js";
import ResponseError from "../error/response.js";
import CultureValidation from "../validation/culture.js";

class CultureService {
  static async create(req) {
    const request = validation(CultureValidation.CREATE, req);
    const slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.culture.create({
      data: { ...request, slug },
      select: { name: true },
    });
  }
  static async get(slug) {
    const request = validation(CultureValidation.GET, slug);
    const culture = await db.culture.findUnique({
      where: { slug: request },
      include: {
        _count: true,
        Category: true,
        District: true,
        users_comment_destinations: true,
        users_like_destinations: true,
        users_save_destinations: true,
        users_view_destinations: true,
      },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    return culture;
  }
  static async gets(req) {
    const queries = validation(CultureValidation.GETS, req);
    return db.culture.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
          { description: { contains: queries.description, mode: "insensitive" } },
          { address: { contains: queries.address, mode: "insensitive" } },
        ],
      },
      include: {
        _count: true,
        District: true,
      },
      take: queries.count,
    });
  }
  static async update(slug, req) {
    const request = validation(CultureValidation.UPDATE, req);
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    if (request.name) request.slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.destination.update({
      where: { slug },
      data: request,
      select: { name: true },
    });
  }
  static async delete(slug) {
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    return db.culture.delete({
      where: { slug },
      select: { name: true },
    });
  }
  static async comment(slug, username, body) {
    const request = validation(CultureValidation.COMMENT, body);
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    return db.users_comment_cultures.create({
      data: {
        cultureSlug: slug,
        body: request,
        username,
      },
      select: {
        username: true,
      },
    });
  }
  static async uncomment(slug, username, id) {
    const comment = await db.users_comment_cultures.findUnique({
      where: {
        id,
        username,
        cultureSlug: slug,
      },
    });
    if (!comment) throw new ResponseError(404, "comment not found");
    return db.users_comment_cultures.delete({
      where: {
        id,
        username,
        cultureSlug: slug,
      },
      select: {
        id: true,
      },
    });
  }
  static async save(slug, username) {
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    const saved = await db.users_save_cultures.findFirst({
      where: {
        username,
        cultureSlug: slug,
      },
    });
    if (saved) throw new ResponseError(400, "culture already saved");
    return db.users_save_cultures.create({
      data: {
        cultureSlug: slug,
        username,
      },
      select: {
        culture: true,
      },
    });
  }
  static async unsave(slug, username) {
    const saved = await db.users_save_cultures.findFirst({
      where: {
        cultureSlug: slug,
        username: username,
      },
    });
    if (!saved) throw new ResponseError(400, "culture not saved");
    await db.users_save_cultures.deleteMany({
      where: {
        username: username,
        cultureSlug: slug,
      },
    });
  }
  static async like(slug, username) {
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    const liked = await db.users_like_cultures.findFirst({
      where: {
        cultureSlug: slug,
        username,
      },
    });
    if (liked) throw new ResponseError(400, "culture already liked");
    return db.users_like_cultures.create({
      data: {
        cultureSlug: slug,
        username,
      },
      select: {
        culture: true,
      },
    });
  }
  static async dislike(slug, username) {
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    const liked = await db.users_like_cultures.findFirst({
      where: {
        cultureSlug: slug,
        username,
      },
    });
    if (!liked) throw new ResponseError(400, "culture not liked");
    await db.users_like_cultures.deleteMany({
      where: {
        cultureSlug: slug,
        username,
      },
    });
  }
  static async view(slug, username) {
    const culture = await db.culture.findUnique({
      where: { slug },
    });
    if (!culture) throw new ResponseError(404, "culture not found");
    const viewed = await db.users_view_cultures.findFirst({
      where: {
        username: username,
        cultureSlug: slug,
      },
    });
    if (viewed) throw new ResponseError(400, "culture already viewed");
    return db.users_view_cultures.create({
      data: {
        username,
        cultureSlug: slug,
      },
      select: { culture: true },
    });
  }
}

export default CultureService;