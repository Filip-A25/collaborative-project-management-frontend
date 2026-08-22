"use client";

import { TaskRow } from "./TaskRow";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTaskStore } from "../store/taskStore";

export const TasksOverview = () => {
  const openModal = useModalStore((store) => store.openModal);
  const tasks = useTaskStore((store) => store.tasks);

  const handleOpenCreateModal = () => {
    openModal({ type: "createTask" });
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="w-full max-xl:order-2">
      <header className="flex justify-between">
        <h3 className="text-primary-dark-1 md:text-sm">Tasks</h3>
        <button
          className="cursor-pointer text-xs text-white rounded-full px-2 bg-primary-2/70 hover:bg-primary-1 transition-colors duration-200 ease-in-out"
          onClick={handleOpenCreateModal}
        >
          + Add task
        </button>
      </header>
      <div className="border rounded-md overflow-hidden mt-2 border-muted-1/30">
        {Boolean(tasks.length) ? (
          <table className="w-full h-full bg-white px-2 table-fixed">
            <colgroup>
              <col className="max-md:w-[25%] w-[35%]" />
              <col className="w-[10%]" />
              <col className="w-[10%]" />
              <col className="max-md:hidden w-[10%]" />
              <col className="max-md:hidden w-[17.5%]" />
              <col className="max-md:hidden w-[17.5%]" />
            </colgroup>
            <thead>
              <tr className="text-left ml-10 border-b border-muted-1/30">
                <th className="py-2 pl-3 pr-2 font-medium text-muted-1 text-sm">
                  Title
                </th>
                <th className="font-medium text-muted-1 text-sm pr-2">
                  Priority
                </th>
                <th className="font-medium text-muted-1 text-sm pr-2">
                  Status
                </th>
                <th className="max-md:hidden font-medium text-muted-1 text-sm pr-2">
                  Type
                </th>
                <th className="max-md:hidden font-medium text-muted-1 text-sm pr-2">
                  Start date
                </th>
                <th className="max-md:hidden font-medium text-muted-1 text-sm pr-2">
                  Due date
                </th>
              </tr>
            </thead>
            <tbody className="w-full h-full">
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-muted-1 w-full text-center py-8">
            No tasks yet.
          </p>
        )}
      </div>
    </div>
  );
};
