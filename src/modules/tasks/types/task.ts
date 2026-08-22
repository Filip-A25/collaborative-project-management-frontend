import { ProjectMember } from "@/modules/projects/schemas/project-member";

type TaskPriority = "Undefined" | "Low" | "Medium" | "High" | "VeryHigh";
type TaskStatus =
  | "Backlog"
  | "InQueue"
  | "InProgress"
  | "InReview"
  | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  creator: ProjectMember;
  assignedTo: ProjectMember;
  priority: TaskPriority;
  status: TaskStatus;
  type?: TaskType;
  startDate?: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
