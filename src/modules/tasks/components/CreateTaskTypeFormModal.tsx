"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { FormButton } from "@/shared/ui/FormButton";
import {
  CreateTaskTypeSchema,
  createTaskTypeSchema,
} from "../schemas/create-task-type";
import { useTasks } from "../hooks/useTasks";
import { ModalPortal } from "@/shared/ui/ModalPortal";

interface Props {
  projectId: string;
  handleCloseModal: VoidFunction;
}

export const CreateTaskTypeFormModal = ({
  projectId,
  handleCloseModal,
}: Props) => {
  const form = useForm<CreateTaskTypeSchema>({
    resolver: zodResolver(createTaskTypeSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { createNewTaskType } = useTasks();

  return (
    <ModalPortal
      closeFn={handleCloseModal}
      headingText="Create a task type"
      wrapperStyling="max-md:mx-3 px-8 py-4 w-full md:w-[500px] overflow-scroll flex flex-col"
    >
      <form>
        <Input
          name="title"
          placeholder="Enter a title"
          type="text"
          register={register}
          hasError={Boolean(errors.title)}
          errorMessage={errors.title?.message}
          customStyling="md:min-w-[420px] md:w-1/2"
          label="Type title"
        />

        <FormButton
          title="Create"
          onClick={handleSubmit((data) => createNewTaskType(projectId, data))}
        />
      </form>
    </ModalPortal>
  );
};
