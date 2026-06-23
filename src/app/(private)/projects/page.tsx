import { ProjectsOverview } from "@/modules/projects/components/ProjectsOverview";
import { getUserProjects } from "@/modules/projects/queries/getUserProjects";

export default async function ProjectsPage() {
  const projects = await getUserProjects();

  return <ProjectsOverview projects={projects} />;
}
