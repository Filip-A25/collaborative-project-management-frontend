import { ProjectMember } from "./projectMember";
import { ProjectRoleType } from "../schemas/project-role";
import { CurrencyValue } from "../const/currencyOptions";

export type Status = "Active" | "Planning" | "OnHold" | "Completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  budgetAmount: number;
  currency: CurrencyValue;
  completionPercentage: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  projectMembers: ProjectMember[];
  roles: ProjectRoleType[];
}
