"use client";

import { TaskRow } from "./TaskRow";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTaskStore } from "../store/taskStore";
import { useProjectAuthorization } from "@/modules/projects/hooks/useProjectAuthorization";
import { PermissionName } from "@/modules/projects/types/permissionName";
import { useMemo, useState } from "react";
import { Task } from "../types/task";
import Select from "react-select";

const sortByArray = [
  {
    value: "startFirst",
    name: "Start first",
  },
  {
    value: "startLast",
    name: "Start last",
  },
];

const getSortedTasks = (tasks: Task[], sortBy: string) => {
  return [...tasks].sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;

    const firstDateTime = new Date(a.startDate).getTime();
    const secondDateTime = new Date(b.startDate).getTime();

    return sortBy === "startFirst"
      ? firstDateTime - secondDateTime
      : secondDateTime - firstDateTime;
  });
};

export const TasksOverview = () => {
  const openModal = useModalStore((store) => store.openModal);
  const tasks = useTaskStore((store) => store.tasks);

  const [sortedBy, setSortedBy] = useState<{
    value: string;
    name: string;
  } | null>();

  const { doesUserHaveProjectPermission } = useProjectAuthorization();

  const handleOpenCreateModal = () => {
    openModal({ type: "createTask" });
    document.body.style.overflow = "hidden";
  };

  const sortedTasks = useMemo(() => {
    if (!sortedBy) return getSortedTasks(tasks, "startFirst");
    return getSortedTasks(tasks, sortedBy.value);
  }, [tasks, sortedBy]);

  return (
    <div className="w-full max-xl:order-2">
      <header className="flex justify-between max-md:flex-col max-md:gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-primary-dark-1 md:text-sm">
            Tasks{" "}
            <span className="text-muted-1">({sortedTasks?.length ?? 0})</span>
          </h3>
          <Select
            instanceId="assigned-to-select"
            options={sortByArray}
            defaultValue={sortByArray[0]}
            onChange={(selected) => setSortedBy(selected)}
            getOptionLabel={(selected) => selected.name}
            className="text-xs"
          />
        </div>
        <div className="flex items-end gap-2">
          {doesUserHaveProjectPermission(PermissionName.ManageProject) && (
            <button
              className="h-6 cursor-pointer bg-primary-dark-1/80 text-xs text-white border border-primary-dark-1 rounded-lg px-2 hover:text-white hover:bg-primary-dark-1 transition-colors duration-200 ease-in-out shadow-md shadow-muted-1/20"
              onClick={() => openModal({ type: "manageTaskTypes" })}
            >
              Manage task types
            </button>
          )}
          {doesUserHaveProjectPermission(PermissionName.ManageTasks) && (
            <button
              className="h-6 cursor-pointer text-xs text-white px-2 bg-primary-2/80 hover:bg-primary-1 rounded-lg transition-colors duration-200 ease-in-out shadow-md shadow-muted-1/20"
              onClick={handleOpenCreateModal}
            >
              + Add task
            </button>
          )}
        </div>
      </header>
      <div className="border rounded-md overflow-hidden mt-2 border-muted-1/30 shadow-md shadow-muted-1/10">
        {sortedTasks && Boolean(sortedTasks.length) ? (
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
              <tr className="text-left ml-10 border-b border-muted-1/30 bg-muted-1/15">
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
              {sortedTasks.map((task) => (
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
