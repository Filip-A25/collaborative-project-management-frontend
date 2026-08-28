import { create } from "zustand";
import { Task } from "../types/task";

interface TaskState {
  tasks: Task[];
  setTasks: (data: Task[]) => void;
  addTask: (newTask: Task) => void;
  removeTask: (taskId: string) => void;
  taskTypes: TaskType[];
  setTaskTypes: (data: TaskType[]) => void;
  addTaskType: (data: TaskType) => void;
  removeTaskType: (taskTypeId: number) => void;
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
  taskTypes: [],
  setTaskTypes: (data: TaskType[]) => set(() => ({ taskTypes: data })),
  addTaskType: (newTaskType: TaskType) =>
    set((state) => ({ taskTypes: [...state.taskTypes, newTaskType] })),
  removeTaskType: (taskTypeId: number) =>
    set((state) => ({
      taskTypes: state.taskTypes.filter(
        (taskType) => taskTypeId !== taskType.id,
      ),
    })),
}));
