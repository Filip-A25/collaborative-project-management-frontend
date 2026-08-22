"use client";

import { Task } from "../types/task";
import { format } from "date-fns";
import { priorityOptions } from "../const/taskDropdownOptions";
import { statusOptions } from "../const/taskDropdownOptions";
import { useModalStore } from "@/shared/stores/modalStore";

interface Props {
  task: Task;
}

export const TaskRow = ({ task }: Props) => {
  const taskStatus = statusOptions.find(
    (option) => option.value === task.status,
  )?.label;

  const taskPriority = priorityOptions.find(
    (option) => option.value === task.priority,
  )?.label;

  const openModal = useModalStore((store) => store.openModal);

  return (
    <tr
      onClick={() => openModal({ type: "viewTask", data: { taskId: task.id } })}
      className="text-sm text-left text-primary-dark-1/70 hover:bg-primary-2/10 transition-colors duration-150 ease-in-out cursor-pointer"
    >
      <th className="py-3 font-medium text-primary-2/80 pl-4 pr-2 md:whitespace-nowrap truncate">
        {task.title}
      </th>
      <td className="pr-2">{taskPriority}</td>
      <td className="pr-2">{taskStatus}</td>
      <td className="max-md:hidden pr-2">{task.type?.title}</td>
      <td className="max-md:hidden pr-2">
        {task.startDate && format(task.startDate, "PP")}
      </td>
      <td className="max-md:hidden pr-2">
        {task.dueDate && format(task.dueDate, "PP")}
      </td>
    </tr>
  );
};
