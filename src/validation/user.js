import { z } from "zod";

class UserValidation {
  static REGISTER = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
    name: z.string().min(3),
  });
  static LOGIN = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
  });
  static UPDATE = z.object({
    name: z.string().min(3).optional(),
    password : z.string().min(3).optional(),
    email: z.string().email().optional(),
    profilePicture: z.string().url().min(4).optional(),
    phoneNumber: z.string().min(3).optional(),
    gender: z.string().min(3).optional(),
  })
}

export default UserValidation;
