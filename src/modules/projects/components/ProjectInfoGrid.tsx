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
  const formattedCompletedDate = project.completedDate
    ? format(new Date(project.completedDate), "PP")
    : "-";

  const projectOwnerName = getProjectOwnerName(project.projectMembers);
  const formattedPrice = Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(project.budgetAmount);

  return (
    <div className="lg:bg-white rounded-xl w-full grid grid-cols-2 gap-x-2 gap-y-2 lg:border lg:border-muted-1/30 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-muted-1/30 lg:shadow-md lg:shadow-muted-1/10">
      <article className="flex flex-col gap-2 px-6 py-4 rounded-xl bg-white border border-muted-1/30 lg:rounded-none lg:bg-transparent lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:py-4 lg:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Start date
        </h3>
        <p className="text-primary-dark-1">{formattedStartDate}</p>
      </article>
      <article className="flex flex-col gap-2 px-6 py-4 rounded-xl bg-white border border-muted-1/30 lg:rounded-none lg:bg-transparent lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:py-4 lg:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Due date
        </h3>
        <p className="text-primary-dark-1">{formattedDueDate}</p>
      </article>
      <article className="flex flex-col gap-2 px-6 py-4 rounded-xl bg-white border border-muted-1/30 lg:rounded-none lg:bg-transparent lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:py-4 lg:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">Budget</h3>
        <p className="text-primary-dark-1">{formattedPrice}</p>
      </article>
      <article className="flex flex-col gap-2 px-6 py-4 rounded-xl bg-white border border-muted-1/30 lg:rounded-none lg:bg-transparent lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:py-4 lg:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Project owner
        </h3>
        <p className="text-primary-dark-1">{projectOwnerName}</p>
      </article>
      <article className="flex flex-col gap-2 px-6 py-4 rounded-xl bg-white border border-muted-1/30 lg:rounded-none lg:bg-transparent lg:border-t-0 lg:border-r-0 lg:border-b-0 lg:py-4 lg:px-4">
        <h3 className="text-xs font-semibold text-primary-dark-1/70">
          Completed on
        </h3>
        <p className="text-primary-dark-1">{formattedCompletedDate}</p>
      </article>
    </div>
  );
};
