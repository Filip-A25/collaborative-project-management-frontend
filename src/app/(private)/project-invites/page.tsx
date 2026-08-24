import { getAllInvites } from "@/modules/projects/queries/getAllInvites";
import { ProjectInvitesOverview } from "@/modules/projects/components/ProjectInvitesOverview";

export default async function ProjectInvitesPage() {
  const projectInvites = (await getAllInvites()) ?? [];

  return <ProjectInvitesOverview invites={projectInvites} />;
}
