"use client";

import { useTaskStore } from "../store/taskStore";
import { useMemberStore } from "@/modules/projects/stores/memberStore";
import { Permission } from "@/modules/projects/types/permission";
import { useTasks } from "../hooks/useTasks";
import { DeleteForever } from "@mui/icons-material";
import { useModalStore } from "@/shared/stores/modalStore";
import { ModalPortal } from "@/shared/ui/ModalPortal";

interface Props {
  projectId: string;
  handleCloseModal: VoidFunction;
}

const canUserDeleteTaskTypes = (permissions?: Permission[]) => {
  if (!permissions) return false;

  return Boolean(
    permissions.find((permission) => permission.name === "ManageProject"),
  );
};

export const TaskTypesList = ({ projectId, handleCloseModal }: Props) => {
  const taskTypes = useTaskStore((store) => store.taskTypes);
  const member = useMemberStore((store) => store.member);
  const openModal = useModalStore((store) => store.openModal);

  const { deleteCurrentTaskType } = useTasks();

  return (
    <ModalPortal
      closeFn={handleCloseModal}
      headingText="Task types"
      wrapperStyling="max-md:w-full max-md:mx-3 px-8 md:px-6 py-4 min-w-[400px] max-w-[600px]"
    >
      <ul>
        {taskTypes.map((type) => (
          <li
            key={type.id}
            className="flex justify-between items-center gap-4 md:gap-10 py-2"
          >
            <div className="max-md:text-sm">
              <h3 className="text-primary-dark-1 text-sm">{type.title}</h3>
            </div>
            {canUserDeleteTaskTypes(member?.projectRole?.permissions) && (
              <button
                onClick={() => deleteCurrentTaskType(projectId, type.id)}
                className="group cursor-pointer w-fit ml-auto"
              >
                <DeleteForever
                  className="text-muted-1 group-hover:text-red-500"
                  style={{
                    transition:
                      "color 150ms ease-in-out, fill 150ms ease-in-out",
                  }}
                  fontSize="small"
                />
              </button>
            )}
          </li>
        ))}
        <button
          onClick={() => openModal({ type: "createTaskType" })}
          className="flex gap-1 cursor-pointer group mt-4 px-2 justify-center rounded-lg bg-primary-1/80 hover:bg-primary-1 shadow-md shadow-muted-1/20 max-md:text-primary-1 outline-none items-end py-1 max-md:mt-3 text-xs text-white transition-colors duration-200 ease-in-out"
        >
          + Add task type
        </button>
      </ul>
    </ModalPortal>
  );
};
