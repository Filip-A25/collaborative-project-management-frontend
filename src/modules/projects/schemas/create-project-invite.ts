import { z } from "zod";

export const createProjectInviteSchema = z.object({
  invitedUserEmail: z.email(),
  roleId: z.number(),
});

export type CreateProjectInviteType = z.input<typeof createProjectInviteSchema>;
