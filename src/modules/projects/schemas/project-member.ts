import { z } from "zod";
import { projectRoleSchema } from "./project-role";

const projectMemberSchema = z.object({
  id: z.number(),
  userId: z.uuid(),
  username: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  projectRole: projectRoleSchema.omit({ projectId: true }),
});

export type ProjectMember = z.infer<typeof projectMemberSchema>;
