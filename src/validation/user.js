import { z } from "zod";

class User {
  static REGISTER = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
    name: z.string().min(3),
  });
  static LOGIN = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  });
}

export default User;
