type PermissionName =
  | "ViewProject"
  | "ManageTasks"
  | "InviteMembers"
  | "RemoveMembers"
  | "ManageRoles"
  | "ManageProject";

interface RolePermission {
  id: number;
  name: PermissionName;
}

export interface ProjectRole {
  name: string;
  color: string;
  isCreatorRole: boolean;
  permissions: RolePermission[];
}
