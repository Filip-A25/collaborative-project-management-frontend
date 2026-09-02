"use client";

import { AddTaskCommentType } from "../schemas/add-task-comment";
import { addTaskComment } from "../queries/addTaskComment";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAllTaskComments } from "../queries/getAllTaskComments";

interface Props {
  projectId: string;
  taskId: string;
}

export const useTaskComments = ({ projectId, taskId }: Props) => {
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);

  const addNewComment = async (
    projectId: string,
    taskId: string,
    data: AddTaskCommentType,
  ) => {
    const response = await addTaskComment(projectId, taskId, data);

    const newTask = response.data;

    if (!response.success || !newTask) {
      toast.error(response.message);
      return;
    }

    setTaskComments((prev) => [...prev, newTask]);
    toast.success(response.message);
  };

  useEffect(() => {
    if (!taskId) return;

    async function getAllTaskCommentsData() {
      const data = await getAllTaskComments(projectId, taskId);
      setTaskComments(data);
    }

    getAllTaskCommentsData();
  }, [projectId, taskId]);

  return { addNewComment, taskComments };
};
