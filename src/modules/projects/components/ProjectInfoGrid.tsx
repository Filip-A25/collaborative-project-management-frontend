import { Project } from "../types/project";
import { format } from "date-fns";
import { ProjectMember } from "../types/projectMember";

interface Props {
  project: Project;
}

const getProjectOwnerName = (projectMembers: ProjectMember[]) => {
  const ownerMember = projectMembers.find(
    (member) => member.projectRole?.isCreatorRole,
  );
  return `${ownerMember?.firstName} ${ownerMember?.lastName}`;
};

export const ProjectInfoGrid = ({ project }: Props) => {
  const formattedStartDate = format(new Date(project.startDate), "PP");
  const formattedDueDate = format(new Date(project.endDate), "PP");
  const projectOwnerName = getProjectOwnerName(project.projectMembers);
  const formattedPrice = Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(project.budgetAmount);

  return (
    <div className="bg-white rounded-xl w-full md:border md:border-muted-1/30 md:grid md:grid-cols-4 md:divide-x md:divide-muted-1/30">
      <article className="flex flex-col gap-2 md:py-4 md:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Start date
        </h3>
        <p className="text-primary-dark-1">{formattedStartDate}</p>
      </article>
      <article className="flex flex-col gap-2 md:py-4 md:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Due date
        </h3>
        <p className="text-primary-dark-1">{formattedDueDate}</p>
      </article>
      <article className="flex flex-col gap-2 md:py-4 md:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">Budget</h3>
        <p className="text-primary-dark-1">{formattedPrice}</p>
      </article>
      <article className="flex flex-col gap-2 md:py-4 md:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Project owner
        </h3>
        <p className="text-primary-dark-1">{projectOwnerName}</p>
      </article>
    </div>
  );
};
