import { create } from "zustand";
import { Task } from "@/modules/tasks/types/task";

type ModalPayload =
  | { type: "createTask" }
  | { type: "updateTask"; data: { task: Task } }
  | { type: "viewTask"; data: { taskId: string } }
  | { type: "viewMembers" }
  | { type: null };

interface ModalState {
  payload: ModalPayload;
  openModal: (payload: ModalPayload) => void;
  closeModal: VoidFunction;
}

export const useModalStore = create<ModalState>((set) => ({
  payload: { type: null, data: null },
  openModal: (data: ModalPayload) => set({ payload: data }),
  closeModal: () => set({ payload: { type: null } }),
}));
