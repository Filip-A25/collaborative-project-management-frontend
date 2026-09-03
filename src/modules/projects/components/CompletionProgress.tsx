"use client";

import { useTaskStore } from "@/modules/tasks/store/taskStore";
import { Task } from "@/modules/tasks/types/task";

const calculateCompletionProgress = (tasks: Task[]) => {
  const totalTasks = tasks.length;

  if (totalTasks === 0) return 0;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return ((completedTasks / totalTasks) * 100).toFixed(2);
};

export const CompletionProgress = () => {
  const allTasks = useTaskStore((store) => store.tasks);
  const completionPercentage = calculateCompletionProgress(allTasks);

  return (
    <>
      <span className="flex items-end gap-3">
        <p className="text-2xl font-semibold">{completionPercentage}%</p>
        <p className="text-xs tracking-widest">COMPLETED</p>
      </span>
      <progress
        value={completionPercentage}
        max={100}
        className="w-full rounded-full overflow-hidden h-2 mt-2 md:mb-4 [&::-webkit-progress-bar]:bg-muted-1/20 [&::-webkit-progress-value]:bg-primary-2"
      />
    </>
  );
};
