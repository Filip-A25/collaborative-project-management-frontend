import { z } from "zod";

const projectRoleSchema = z.object({
  projectId: z.uuid(),
  name: z.string().max(60),
  color: z.string().length(6),
});

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  currency: z.length(3),
  budgetAmount: z.number().nonnegative(),
  /* roles: projectRoleSchema.array(), */
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;
