import { z } from "zod";

export const createTaskTypeSchema = z.object({
  title: z.string().max(30),
});

export type CreateTaskTypeSchema = z.input<typeof createTaskTypeSchema>;
