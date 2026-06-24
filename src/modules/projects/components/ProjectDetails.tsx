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
      <section className="md:mt-8">
        <header className="flex justify-between">
          <div className="md:max-w-[60%]">
            <span className="flex gap-6 items-center">
              <h1 className="text-3xl text-primary-dark-1">{project.name}</h1>
              <p
                className={clsx(
                  "text-xs rounded-full border px-3 py-1",
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
        <section className="md:mt-8 md:flex md:flex-col md:items-end">
          <ProjectInfoGrid project={project} />
          <div className="md:mt-8">
            <ProjectMembersList members={project.projectMembers} />
          </div>
        </section>
      </section>
    </>
  );
};
