import { getProjectById } from "@/modules/projects/queries/getProjectById";
import { ProjectDetails } from "@/modules/projects/components/ProjectDetails";
import { getTaskTypes } from "@/modules/tasks/queries/getTaskTypes";
import { getAllTasks } from "@/modules/tasks/queries/getAllTasks";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  const tasks = await getAllTasks(id);
  const taskTypes = await getTaskTypes(id);

  if (!project) return null;

  return (
    <ProjectDetails project={project} taskTypes={taskTypes} tasks={tasks} />
  );
}
