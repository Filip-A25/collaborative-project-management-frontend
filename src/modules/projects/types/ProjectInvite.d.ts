interface ProjectInvite {
  id: number;
  projectId: string;
  projectName: string;
  invitedUserId: string;
  invitedUserRoleId: number;
  expiresAt: Date;
  inviterUser: User;
}
