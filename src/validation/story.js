import { z } from "zod";

class StoryValidation {
  static CREATE = z.object({
    name: z.string().min(4).max(200),
    description: z.string().min(10).max(400),
    cover: z.string().url().min(4),
    body: z.string().min(20).max(1000),
    readingTime: z.number().nonnegative()
  });
  static GETS = z.object({
    count: z.number().min(1).optional(),
    name: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(200).optional(),
  });
  static UPDATE = z.object({
    name: z.string().min(4).max(200).optional(),
    description: z.string().min(10).max(400).optional(),
    cover: z.string().url().min(4).optional(),
    body: z.string().min(20).max(1000).optional(),
    readingTime: z.number().nonnegative().optional()
  });
  static COMMENT = z.string().min(1);
}

export default StoryValidation;