import { z } from "zod";

class StoryValidation {
  static CREATE = z.object({
    name: z.string().min(4).max(200),
    description: z.string().min(10).max(400),
    cover: z.string().url().min(4),
    body: z.string().min(20).max(1000),
    readingTime: z.number().nonnegative()
  })
}