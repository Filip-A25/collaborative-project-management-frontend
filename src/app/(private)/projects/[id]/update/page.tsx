import { getAllPermissions } from "@/modules/projects/queries/getAllPermissions";
import { getProjectById } from "@/modules/projects/queries/getProjectById";
import { UpdateProjectForm } from "@/modules/projects/components/UpdateProjectForm";

export default async function ProjectUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projectData = await getProjectById(id);
  const permissionDate = await getAllPermissions();

  if (!projectData) return;

  return (
    <section className="bg-white pt-20 pb-24 px-4 md:py-5 md:px-8">
      <h1 className="text-2xl">Update {projectData.name}</h1>
      <UpdateProjectForm
        permissionsData={permissionDate}
        projectData={projectData}
      />
    </section>
  );
}
