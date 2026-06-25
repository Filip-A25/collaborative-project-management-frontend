import { Project } from "../types/project";
import { sidebarItems } from "../const/sidebarItems";
import { LayoutHeading } from "@/shared/ui/LayoutHeading";
import { getStatusTextStyling } from "../lib/utils";
import clsx from "clsx";
import { CompletionProgress } from "./CompletionProgress";
import { ProjectInfoGrid } from "./ProjectInfoGrid";
import { ProjectMembersList } from "./ProjectMembersList";

interface Props {
  project: Project;
}

export const ProjectDetails = ({ project }: Props) => {
  const sidebarItem = sidebarItems.find((item) => item.name === "Projects");
  const projectStatus =
    project.status === "OnHold" ? "On hold" : project.status;

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
          subRouteName={project.name}
        />
      )}
      <section className="px-4 mt-24 md:mt-8">
        <header className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between">
          <div className="flex flex-col gap-6 md:gap-0 md:max-w-[60%]">
            <span className="flex flex-col gap-3 md:flex-row md:gap-6 md:items-center">
              <h1 className="order-2 text-3xl text-primary-dark-1">
                {project.name}
              </h1>
              <p
                className={clsx(
                  "w-fit text-xs rounded-full border px-3 py-1",
                  getStatusTextStyling(project.status),
                )}
              >
                {projectStatus}
              </p>
            </span>
            <p className="md:mt-6 text-sm text-primary-dark-1/70">
              {project.description}
            </p>
          </div>
          <CompletionProgress
            completionPercentage={project.completionPercentage}
          />
        </header>
        <section className="flex flex-col gap-6 mt-8 md:gap-0 md:mt-8 md:items-end">
          <ProjectInfoGrid project={project} />
          <div className="md:mt-8">
            <ProjectMembersList members={project.projectMembers} />
          </div>
        </section>
      </section>
    </>
  );
};
