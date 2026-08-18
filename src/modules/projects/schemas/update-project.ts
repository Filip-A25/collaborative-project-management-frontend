import { z } from "zod";
import { projectRoleSchema } from "./project-role";

export const updateProjectSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  currency: z.enum(["EUR", "USD", "GBP", "JPY", "CNY", "CHF", "AUD", "CAD"]),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  roles: projectRoleSchema
    .omit({ projectId: true })
    .extend({ id: z.number().optional() })
    .array(),
});

export type UpdateProjectType = z.input<typeof updateProjectSchema>;
