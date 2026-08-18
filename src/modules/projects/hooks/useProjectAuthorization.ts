"use client";

import { useMemberStore } from "../stores/memberStore";
import { PermissionName } from "../types/permissionName";

export const useProjectAuthorization = () => {
  const member = useMemberStore((store) => store.member);

  const doesUserHaveProjectPermission = (permissionName: PermissionName) => {
    const userPermissions = member?.projectRole?.permissions;

    return Boolean(
      userPermissions?.find(
        (permission) => permission.name === permissionName.toString(),
      ),
    );
  };

  return { doesUserHaveProjectPermission };
};
