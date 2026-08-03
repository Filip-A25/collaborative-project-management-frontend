import { z } from "zod";

const projectRoleSchema = z.object({
  projectId: z.uuid(),
  name: z.string().max(60),
  color: z.string().length(6),
  permissions: z.number().array(),
});

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  currency: z.string().length(3),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  roles: projectRoleSchema.omit({ projectId: true }).array(),
});

export type CreateProjectType = z.input<typeof createProjectSchema>;
