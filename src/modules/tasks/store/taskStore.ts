import { create } from "zustand";
import { Task } from "../types/task";

interface TaskState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  addTask: (newTask: Task) => void;
  removeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (data: Task[]) => set(() => ({ tasks: data })),
  addTask: (newTask: Task) =>
    set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));
