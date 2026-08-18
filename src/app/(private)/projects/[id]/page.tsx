import { getProjectById } from "@/modules/projects/queries/getProjectById";
import { ProjectDetails } from "@/modules/projects/components/ProjectDetails";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) return null;

  return <ProjectDetails project={project} />;
}
