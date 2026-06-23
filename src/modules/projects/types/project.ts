import { ProjectMember } from "./projectMember";

export type Status = "Active" | "Planning" | "OnHold" | "Completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  budgetAmount: number;
  currency: string;
  completionPercentage: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  projectMembers: ProjectMember[];
}
