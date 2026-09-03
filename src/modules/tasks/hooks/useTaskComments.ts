"use client";

import { AddTaskCommentType } from "../schemas/add-task-comment";
import { addTaskComment } from "../queries/addTaskComment";
import { toast } from "sonner";
import { deleteTaskComment } from "../queries/deleteTaskComment";
import { useState } from "react";

export const useTaskComments = () => {
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

  const deleteCurrentTaskComment = async (
    projectId: string,
    taskId: string,
    commentId: number,
  ) => {
    const response = await deleteTaskComment(projectId, taskId, commentId);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    const filteredTaskComments = [...taskComments].filter(
      (comment) => comment.id !== commentId,
    );
    setTaskComments(filteredTaskComments);
  };

  return {
    addNewComment,
    taskComments,
    setTaskComments,
    deleteCurrentTaskComment,
  };
};
