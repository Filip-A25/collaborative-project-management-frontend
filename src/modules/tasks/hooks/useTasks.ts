"use client";

import { CreateTaskType } from "../schemas/create-task";
import { createTask } from "../queries/createTask";
import { toast } from "sonner";
import { UpdateTaskType } from "../schemas/update-task";
import { updateTask } from "../queries/updateTask";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { useRouter } from "next/navigation";
import { deleteTask } from "../queries/deleteTask";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTaskStore } from "../store/taskStore";

export const useTasks = () => {
  const router = useRouter();
  const closeModal = useModalStore((store) => store.closeModal);
  const addTask = useTaskStore((store) => store.addTask);
  const removeTask = useTaskStore((store) => store.removeTask);

  const createNewTask = async (projectId: string, data: CreateTaskType) => {
    const response = await createTask(projectId, data);

    if (!response.success || !response.data) {
      toast.error(response.message);
      return;
    }

    addTask(response.data);
    toast.success(response.message);
  };

  const updateCurrentTask = async (
    projectId: string,
    taskId: string,
    data: UpdateTaskType,
  ) => {
    const response = await updateTask(projectId, taskId, data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    const redirectRoute = `${PRIVATE_ROUTES.Projects}/${projectId}`;
    return router.push(redirectRoute);
  };

  const deleteCurrentTask = async (projectId: string, taskId: string) => {
    const response = await deleteTask(projectId, taskId);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    removeTask(taskId);
    closeModal();
  };

  return { createNewTask, updateCurrentTask, deleteCurrentTask };
};
