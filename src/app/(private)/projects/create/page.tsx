import { CreateProjectForm } from "@/modules/projects/components/CreateProjectForm";
import { getAllPermissions } from "@/modules/projects/queries/getAllPermissions";
import { FullPageFormLayout } from "@/shared/ui/FullPageFormLayout";

export default async function CreateProject() {
  const permissionDate = await getAllPermissions();

  return (
    <FullPageFormLayout title="Create project">
      <CreateProjectForm permissionsData={permissionDate} />
    </FullPageFormLayout>
  );
}
