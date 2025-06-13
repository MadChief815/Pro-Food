import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email address" });

export const userNameSchema = z.string().min(5, { message: "User Name must be at least 5 characters" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
    username: z.string().min(5, { message: "User name must be at least 5 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordSchema
});

export const forgotSchema = z.object({
  email: emailSchema,
});