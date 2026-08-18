import { getAllPermissions } from "@/modules/projects/queries/getAllPermissions";
import { getProjectById } from "@/modules/projects/queries/getProjectById";
import { UpdateProjectForm } from "@/modules/projects/components/UpdateProjectForm";
import { FullPageFormLayout } from "@/shared/ui/FullPageFormLayout";

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
    <FullPageFormLayout title={`Update ${projectData.name}`}>
      <UpdateProjectForm
        permissionsData={permissionDate}
        projectData={projectData}
      />
    </FullPageFormLayout>
  );
}
