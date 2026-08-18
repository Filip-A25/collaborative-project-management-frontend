import { ProjectRole } from "./projectRole";

export interface ProjectMember {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  projectRole?: ProjectRole;
}
