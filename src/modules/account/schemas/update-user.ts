import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  username: z.string().max(50).optional(),
  email: z.email().max(255).optional(),
});

export type UpdateUserType = z.input<typeof updateUserSchema>;
