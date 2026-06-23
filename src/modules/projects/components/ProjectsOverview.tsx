import { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";
import { LayoutHeading } from "@/shared/ui/LayoutHeading";
import { sidebarItems } from "../const/sidebarItems";

interface Props {
  projects?: Project[];
}

export const ProjectsOverview = ({ projects }: Props) => {
  const sidebarItem = sidebarItems.find((item) => item.name === "Projects");

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
        />
      )}
      <section className="md:ml-8 md:mr-6 md:mt-12 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-w-0 md:gap-3">
        {projects?.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </section>
    </>
  );
};
