"use client";

import { format } from "date-fns";
import { statusOptions, priorityOptions } from "../const/taskDropdownOptions";
import clsx from "clsx";
import EditIcon from "@mui/icons-material/Edit";
import { useModalStore } from "@/shared/stores/modalStore";
import { DeleteForever } from "@mui/icons-material";
import { useTasks } from "../hooks/useTasks";
import { useTaskStore } from "../store/taskStore";
import { useProjectAuthorization } from "@/modules/projects/hooks/useProjectAuthorization";
import { PermissionName } from "@/modules/projects/types/permissionName";
import { ModalPortal } from "@/shared/ui/ModalPortal";
import { TaskComments } from "./TaskComments";

interface Props {
  projectId: string;
  taskId: string;
  handleCloseModal: VoidFunction;
}

const getLabelColorStyling = (color: string) => {
  switch (color) {
    case "gray":
      return "border-gray-500/20 text-gray-500 bg-gray-500/10";
    case "yellow":
      return "border-yellow-500/20 text-yellow-500 bg-yellow-500/10";
    case "orange":
      return "border-orange-500/20 text-orange-500 bg-orange-500/10";
    case "red":
      return "border-red-500/20 text-red-500 bg-red-500/10";
    case "blue":
      return "border-primary-1-500/20 text-primary-1-500 bg-primary-1-500/10";
    case "purple":
      return "border-purple-500/20 text-purple-500 bg-purple-500/10";
    case "green":
      return "border-green-500/20 text-green-500 bg-green-500/10";
    case "dark-red":
      return "border-red-800/20 text-red-800 bg-red-800/10";
  }
};

export const TaskInfoCard = ({
  projectId,
  taskId,
  handleCloseModal,
}: Props) => {
  const openModal = useModalStore((store) => store.openModal);
  const allTasks = useTaskStore((store) => store.tasks);

  const { doesUserHaveProjectPermission } = useProjectAuthorization();
  const { deleteCurrentTask } = useTasks();
  const task = allTasks.find((taskData) => taskData.id === taskId);

  if (!task) return;

  const taskStatus = statusOptions.find(
    (option) => option.value === task.status,
  );

  const taskPriority = priorityOptions.find(
    (option) => option.value === task.priority,
  );

  const assignedToFullName = task.assignedTo
    ? `${task.assignedTo.firstName ?? ""} ${task.assignedTo.lastName ?? ""}`
    : "";
  const createdByFullName = task.creator
    ? `${task.creator.firstName ?? ""} ${task.creator.lastName ?? ""}`
    : "";

  return (
    <ModalPortal
      closeFn={handleCloseModal}
      wrapperStyling="mx-3 px-8 py-4 h-[90vh] max-h-[620px] md:w-[500px] overflow-scroll flex flex-col"
    >
      <div className="flex flex-col">
        <h3 className="text-primary-dark-1/80 font-medium text-xl mb-2">
          {task.title}
        </h3>
        {doesUserHaveProjectPermission(PermissionName.ManageTasks) && (
          <div className="flex gap-2">
            <button
              className="flex gap-1 cursor-pointer group w-fit justify-center rounded-lg bg-primary-1/80 hover:bg-primary-1 text-white outline-none items-center py-0.5 px-2  text-xs font-semibold leading-tight transition-colors duration-200 ease-in-out"
              onClick={() => openModal({ type: "updateTask", data: { task } })}
            >
              <EditIcon sx={{ fontSize: 16 }} className="text-white" />
              Edit
            </button>
            <button
              className="flex gap-1 cursor-pointer group w-fit justify-center rounded-lg bg-red-500/80 hover:bg-red-500 text-white outline-none items-center py-0.5 px-2  text-xs font-semibold leading-tight transition-colors duration-200 ease-in-out"
              onClick={() => deleteCurrentTask(projectId, taskId)}
            >
              <DeleteForever sx={{ fontSize: 16 }} className="text-white" />
              Delete
            </button>
          </div>
        )}
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 mt-6 mb-8 text-sm">
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Created</p>
              <p className="text-primary-dark-1">
                {format(task.createdAt, "PPpp")}
              </p>
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Updated</p>
              <p className="text-primary-dark-1">
                {format(task.updatedAt, "PPpp")}
              </p>
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Priority</p>
              {taskPriority && (
                <p
                  className={clsx(
                    "text-xs border rounded-full px-2 w-fit",
                    getLabelColorStyling(taskPriority.color),
                  )}
                >
                  {taskPriority.label}
                </p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Status</p>
              {taskStatus && (
                <p
                  className={clsx(
                    "text-xs border rounded-full px-2 w-fit",
                    getLabelColorStyling(taskStatus.color),
                  )}
                >
                  {taskStatus.label}
                </p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Assigned to</p>
              {assignedToFullName && (
                <p className=" text-primary-dark-1">{assignedToFullName}</p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Created by</p>
              {createdByFullName && (
                <p className="text-primary-dark-1">{createdByFullName}</p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Type</p>
              {task.type && (
                <p className="text-primary-dark-1">{task.type.title}</p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Start date</p>
              {task.startDate && (
                <p className="text-primary-dark-1">
                  {format(task.startDate, "PP")}
                </p>
              )}
            </article>
            <article className="grid grid-cols-2 gap-4">
              <p className="text-muted-1 col-span-1">Due date</p>
              {task.dueDate && (
                <p className="text-primary-dark-1">
                  {format(task.dueDate, "PP")}
                </p>
              )}
            </article>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm text-primary-dark-1">{task.description}</p>
          </div>
        </div>
        <TaskComments projectId={projectId} taskId={taskId} />
      </div>
    </ModalPortal>
  );
};
