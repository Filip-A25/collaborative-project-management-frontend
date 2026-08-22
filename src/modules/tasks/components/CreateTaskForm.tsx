"use client";

import { useForm, Controller } from "react-hook-form";
import { CreateTaskType } from "../schemas/create-task";
import { createTaskSchema } from "../schemas/create-task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { Project } from "@/modules/projects/types/project";
import { formSelectStyling } from "@/modules/projects/const/formSelectStyling";
import Select from "react-select";
import { priorityOptions, statusOptions } from "../const/taskDropdownOptions";
import { FormButton } from "@/shared/ui/FormButton";
import { useTasks } from "../hooks/useTasks";

interface Props {
  projectData: Project;
  closeTaskModalFn: VoidFunction;
}

export const CreateTaskForm = ({ projectData, closeTaskModalFn }: Props) => {
  const { createNewTask } = useTasks();

  const form = useForm<CreateTaskType>({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: undefined,
      priority: "Undefined",
      status: "Backlog",
      type: undefined,
      startDate: undefined,
      dueDate: undefined,
    },
    resolver: zodResolver(createTaskSchema),
  });

  const membersSelection = projectData.projectMembers;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const handleCreateTask = async (data: CreateTaskType) => {
    await createNewTask(projectData.id, data);
    closeTaskModalFn();
  };

  return (
    <form>
      <Input
        name="title"
        placeholder="Enter a title"
        type="text"
        register={register}
        hasError={Boolean(errors.title)}
        errorMessage={errors.title?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Title"
      />
      <Input
        name="description"
        placeholder="Enter a description"
        type="textarea"
        register={register}
        hasError={Boolean(errors.description)}
        errorMessage={errors.description?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Description"
      />
      <div className="mt-4">
        <label htmlFor="assignedTo" className="text-sm text-primary-dark-1">
          Assigned To
        </label>
        <Controller
          name="assignedTo"
          control={control}
          render={({ field }) => (
            <Select
              instanceId="assigned-to-select"
              options={membersSelection}
              getOptionLabel={(member) =>
                `${member.firstName} ${member.lastName} (${member.username})`
              }
              getOptionValue={(member) => member.id.toString()}
              value={membersSelection.find(
                (member) => member.id === field.value,
              )}
              onChange={(selected) => field.onChange(selected?.id ?? undefined)}
              classNames={formSelectStyling}
              className="md:min-w-[420px] md:w-1/2"
            />
          )}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="priority" className="text-sm text-primary-dark-1">
          Priority
        </label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              instanceId="priority-select"
              options={priorityOptions}
              defaultValue={priorityOptions[0]}
              value={priorityOptions.find(
                (priority) => priority.value === field.value,
              )}
              onChange={(selected) => field.onChange(selected?.value)}
              classNames={formSelectStyling}
              className="md:min-w-[420px] md:w-1/2"
            />
          )}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="status" className="text-sm text-primary-dark-1">
          Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              instanceId="status-select"
              options={statusOptions}
              defaultValue={statusOptions[0]}
              value={statusOptions.find(
                (status) => status.value === field.value,
              )}
              onChange={(selected) => field.onChange(selected?.value)}
              classNames={formSelectStyling}
              className="md:min-w-[420px] md:w-1/2"
            />
          )}
        />
      </div>
      <Input
        name="startDate"
        placeholder="Enter start date"
        type="date"
        register={register}
        hasError={Boolean(errors.startDate)}
        errorMessage={errors.startDate?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Start date"
      />
      <Input
        name="dueDate"
        placeholder="Enter due date"
        type="date"
        register={register}
        hasError={Boolean(errors.dueDate)}
        errorMessage={errors.dueDate?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Due date"
      />

      <FormButton title="Create" onClick={handleSubmit(handleCreateTask)} />
    </form>
  );
};
