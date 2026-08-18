import { z } from "zod";

const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const projectRoleSchema = z.object({
  id: z.number(),
  projectId: z.uuid(),
  name: z.string().max(60),
  color: z.string().max(20),
  permissions: permissionSchema.array(),
  isCreatorRole: z.boolean().optional(),
});

export type ProjectRoleType = z.infer<typeof projectRoleSchema>;
