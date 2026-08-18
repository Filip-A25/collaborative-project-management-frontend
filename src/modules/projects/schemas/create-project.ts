import { z } from "zod";
import { projectRoleSchema } from "./project-role";

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  currency: z.enum(["EUR", "USD", "GBP", "JPY", "CNY", "CHF", "AUD", "CAD"]),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  roles: projectRoleSchema.omit({ id: true, projectId: true }).array(),
});

export type CreateProjectType = z.input<typeof createProjectSchema>;
