"use client";

import { ProjectMember } from "../types/projectMember";
import clsx from "clsx";
import { getRoleColorStyling } from "../utils/getRoleColorStyling";
import { useModalStore } from "@/shared/stores/modalStore";

interface Props {
  members: ProjectMember[];
}

export const ProjectMembersList = ({ members }: Props) => {
  const openModal = useModalStore((store) => store.openModal);

  const handleOpenModal = () => {
    openModal({ type: "viewMembers" });
    document.body.style.overflow = "hidden";
  };

  return (
    <div>
      <div className="flex justify-between md:w-60">
        <h2 className="text-primary-dark-1 text-base md:text-sm">
          Members <span className="text-muted-1">({members.length})</span>
        </h2>
        <button
          onClick={handleOpenModal}
          className="text-xs text-muted-1 cursor-pointer hover:text-primary-2 transition-colors duration-200 ease-in-out"
        >
          View all
        </button>
      </div>
      <ul className="rounded-lg flex flex-col gap-6 mt-2 px-4 py-4 md:w-60 md:min-h-40 border border-muted-1/30 bg-white">
        {members.map((member) => {
          const fullMemberName = `${member.firstName} ${member.lastName}`;
          return (
            <li key={member.username}>
              <button className="flex justify-between items-center w-full cursor-pointer">
                <div>
                  <p className="text-sm text-primary-dark-2 font-semibold text-start">
                    {fullMemberName}
                  </p>
                  <p
                    className={clsx(
                      "text-xs text-start",
                      member.projectRole?.color
                        ? getRoleColorStyling(member.projectRole?.color)
                        : "text-muted-1",
                    )}
                  >
                    {member.projectRole?.name}
                  </p>
                </div>
                {member.projectRole?.isCreatorRole && (
                  <p className="text-primary-2 text-xs bg-primary-1/10 rounded-md px-2 h-fit font-semibold">
                    Owner
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
