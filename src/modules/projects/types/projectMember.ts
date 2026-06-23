import { ProjectRole } from "./projectRole";

export interface ProjectMember {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  projectRole?: ProjectRole;
}
