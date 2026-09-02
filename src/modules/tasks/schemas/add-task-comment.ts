import { z } from "zod";

export const addTaskCommentSchema = z.object({
  text: z.string().max(2000),
});

export type AddTaskCommentType = z.input<typeof addTaskCommentSchema>;
