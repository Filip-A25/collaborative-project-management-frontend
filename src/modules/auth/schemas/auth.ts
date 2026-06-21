import { z } from "zod";
import { AUTH_VALIDATION_ERROR_MESSAGES } from "../const/validationErrorMessages";

const usernameSchema = z
  .string()
  .max(30, AUTH_VALIDATION_ERROR_MESSAGES.username.tooLong);
const passwordSchema = z
  .string()
  .min(1, AUTH_VALIDATION_ERROR_MESSAGES.password.empty)
  .min(8, AUTH_VALIDATION_ERROR_MESSAGES.password.tooShort)
  .regex(
    /^(?=.*[A-Z])(?=.*[\d\W]).+$/,
    AUTH_VALIDATION_ERROR_MESSAGES.password.pattern,
  );

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, AUTH_VALIDATION_ERROR_MESSAGES.firstName.empty)
    .max(100, AUTH_VALIDATION_ERROR_MESSAGES.firstName.tooLong),
  lastName: z
    .string()
    .min(1, AUTH_VALIDATION_ERROR_MESSAGES.lastName.empty)
    .max(100, AUTH_VALIDATION_ERROR_MESSAGES.lastName.tooLong),
  username: usernameSchema.min(
    1,
    AUTH_VALIDATION_ERROR_MESSAGES.username.empty,
  ),
  email: z.email(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  emailOrUsername: z.union([
    z.string().min(1, AUTH_VALIDATION_ERROR_MESSAGES.usernameOrEmail.empty),
    z.email(),
  ]),
  password: z.string().min(1, AUTH_VALIDATION_ERROR_MESSAGES.password.empty),
});

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
