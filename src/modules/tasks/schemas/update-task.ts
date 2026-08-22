import { z } from "zod";
import { createTaskSchema } from "./create-task";

export const updateTaskSchema = createTaskSchema.extend({ id: z.string() });

export type UpdateTaskType = z.input<typeof updateTaskSchema>;
