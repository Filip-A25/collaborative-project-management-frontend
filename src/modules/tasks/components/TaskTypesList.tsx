"use client";

import { useTaskStore } from "../store/taskStore";
import { useMemberStore } from "@/modules/projects/stores/memberStore";
import { Permission } from "@/modules/projects/types/permission";
import { useTasks } from "../hooks/useTasks";
import { DeleteForever } from "@mui/icons-material";
import { useModalStore } from "@/shared/stores/modalStore";

interface Props {
  projectId: string;
}

const canUserDeleteTaskTypes = (permissions?: Permission[]) => {
  if (!permissions) return false;

  return Boolean(
    permissions.find((permission) => permission.name === "ManageProject"),
  );
};

export const TaskTypesList = ({ projectId }: Props) => {
  const taskTypes = useTaskStore((store) => store.taskTypes);
  const member = useMemberStore((store) => store.member);
  const openModal = useModalStore((store) => store.openModal);

  const { deleteCurrentTaskType } = useTasks();

  return (
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
                  transition: "color 150ms ease-in-out, fill 150ms ease-in-out",
                }}
                fontSize="small"
              />
            </button>
          )}
        </li>
      ))}
      <button
        onClick={() => openModal({ type: "createTaskType" })}
        className="flex gap-1 cursor-pointer group mt-4 px-2 justify-center rounded-lg max-md:border-primary-1 max-md:text-primary-1 border md:hover:border-primary-1 md:border-muted-1 outline-none items-end max-md:hover:border-primary-1 py-1 max-md:mt-3 text-xs text-muted-1 hover:text-primary-1"
      >
        + Add task type
      </button>
    </ul>
  );
};
