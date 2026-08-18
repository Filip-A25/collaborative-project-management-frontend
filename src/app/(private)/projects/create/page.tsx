import { CreateProjectForm } from "@/modules/projects/components/CreateProjectForm";
import { getAllPermissions } from "@/modules/projects/queries/getAllPermissions";

export default async function CreateProject() {
  const permissionDate = await getAllPermissions();

  return (
    <section className="bg-white pt-20 pb-24 px-4 md:py-5 md:px-8">
      <h1 className="text-2xl">Create project</h1>
      <CreateProjectForm permissionsData={permissionDate} />
    </section>
  );
}
