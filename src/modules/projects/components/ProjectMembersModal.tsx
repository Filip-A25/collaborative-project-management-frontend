"use client";

import { ModalPortal } from "@/shared/ui/ModalPortal";
import { ProjectMember } from "../types/projectMember";
import clsx from "clsx";
import { PersonOffOutlined } from "@mui/icons-material";
import { useProjects } from "../hooks/useProjects";
import { useProjectAuthorization } from "../hooks/useProjectAuthorization";
import { PermissionName } from "../types/permissionName";
import { getRoleColorStyling } from "../utils/getRoleColorStyling";

interface Props {
  members: ProjectMember[];
  closeModal: VoidFunction;
  projectId: string;
  handleRemovedMember: (memberId: number) => void;
}

const checkRemovalPermissions = (
  hasUserPermission: boolean,
  removingMember: ProjectMember,
) => {
  const isUserCreator = removingMember.projectRole?.isCreatorRole;

  return hasUserPermission && !isUserCreator;
};

export const ProjectMembersModal = ({
  members,
  closeModal,
  projectId,
  handleRemovedMember,
}: Props) => {
  const { removeProjectMemberWithId } = useProjects();
  const { doesUserHaveProjectPermission } = useProjectAuthorization();

  const removeMember = async (projectId: string, memberId: number) => {
    await removeProjectMemberWithId(projectId, memberId);
    handleRemovedMember(memberId);
  };

  return (
    <ModalPortal
      closeFn={closeModal}
      headingText={`Members (${members.length})`}
      wrapperStyling="max-md:w-full mx-4 px-4 md:px-6 py-3 max-w-[600px]"
    >
      <ul>
        {members.map((member) => {
          const fullName = `${member.firstName} ${member.lastName}`;
          const doesUserHavePermission = doesUserHaveProjectPermission(
            PermissionName.RemoveMembers,
          );
          const canBeRemoved = checkRemovalPermissions(
            doesUserHavePermission,
            member,
          );

          return (
            <li
              key={member.username}
              className="grid grid-cols-12 md:grid-cols-6 justify-between items-center gap-4 md:gap-10 py-2"
            >
              <div className="max-md:text-sm col-span-4 md:col-span-2">
                <h3>{fullName}</h3>
                <p
                  className={clsx(
                    "text-xs",
                    member.projectRole?.color
                      ? getRoleColorStyling(member.projectRole.color)
                      : "text-muted-1",
                  )}
                >
                  {member.projectRole?.name}
                </p>
              </div>
              <p className="text-xs md:text-sm col-span-6 md:col-span-3 text-muted-1">
                {member.email}
              </p>
              {canBeRemoved && (
                <button
                  onClick={() => removeMember(projectId, member.id)}
                  className="group cursor-pointer w-fit ml-auto max-md:col-span-2"
                >
                  <PersonOffOutlined
                    className="text-muted-1 group-hover:text-red-500"
                    style={{
                      transition:
                        "color 150ms ease-in-out, fill 150ms ease-in-out",
                    }}
                  />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </ModalPortal>
  );
};
