type PermissionValue =
  | "ViewProject"
  | "ManageTasks"
  | "InviteMembers"
  | "RemoveMembers"
  | "ManageRoles"
  | "ManageProject";

interface RolePermission {
  id: number;
  name: PermissionValue;
}

export interface ProjectRole {
  name: string;
  color: string;
  isCreatorRole: boolean;
  permissions: RolePermission[];
}
