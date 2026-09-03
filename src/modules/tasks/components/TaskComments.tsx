"use client";

import { Input } from "@/shared/ui/Input";
import { useForm } from "react-hook-form";
import {
  addTaskCommentSchema,
  AddTaskCommentType,
} from "../schemas/add-task-comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton } from "@/shared/ui/FormButton";
import { useTaskComments } from "../hooks/useTaskComments";
import { TaskCommentsList } from "./TaskCommentsList";
import { useEffect } from "react";
import { getAllTaskComments } from "../queries/getAllTaskComments";

interface Props {
  projectId: string;
  taskId: string;
}

export const TaskComments = ({ projectId, taskId }: Props) => {
  const { addNewComment, taskComments, setTaskComments } = useTaskComments();

  const form = useForm<AddTaskCommentType>({
    resolver: zodResolver(addTaskCommentSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!taskId) return;

    async function getAllTaskCommentsData() {
      const data = await getAllTaskComments(projectId, taskId);
      setTaskComments(data);
    }

    getAllTaskCommentsData();
  }, [projectId, taskId, setTaskComments]);

  return (
    <div className="mt-10">
      <h3 className="text-xs text-muted-1">
        Comments{" "}
        {Boolean(taskComments.length) && <span>({taskComments.length})</span>}
      </h3>
      <form>
        <Input
          name="text"
          placeholder="Leave a comment..."
          type="textarea"
          register={register}
          hasError={Boolean(errors.text)}
          errorMessage={errors.text?.message}
          customStyling="md:min-w-[420px] md:w-1/2"
          colsNum={3}
        />
        <FormButton
          title="Submit"
          onClick={handleSubmit((data) =>
            addNewComment(projectId, taskId, data),
          )}
          customStyling="text-xs mt-2"
        />
      </form>
      <TaskCommentsList
        comments={taskComments}
        projectId={projectId}
        taskId={taskId}
      />
    </div>
  );
};
