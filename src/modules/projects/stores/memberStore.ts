import { create } from "zustand";
import { ProjectMember } from "../types/projectMember";

interface MemberState {
  member: ProjectMember | null;
  setMember: (data: ProjectMember | null) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (data: ProjectMember | null) => set(() => ({ member: data })),
}));
