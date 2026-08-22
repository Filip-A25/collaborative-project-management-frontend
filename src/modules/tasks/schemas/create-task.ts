import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(300),
  description: z.string().optional(),
  assignedTo: z.number().optional(),
  priority: z.enum(["Undefined", "Low", "Medium", "High", "VeryHigh"]),
  status: z.enum(["Backlog", "InQueue", "InProgress", "InReview", "Completed"]),
  type: z.number().optional(),
  startDate: z.iso.date().optional(),
  dueDate: z.iso.date().optional(),
});

export type CreateTaskType = z.input<typeof createTaskSchema>;
