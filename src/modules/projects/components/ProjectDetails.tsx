import { Project } from "../types/project";
import { sidebarItems } from "../const/sidebarItems";
import { LayoutHeading } from "@/shared/ui/LayoutHeading";

interface Props {
  project: Project;
}

export const ProjectDetails = ({ project }: Props) => {
  const sidebarItem = sidebarItems.find((item) => item.name === "Projects");

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
          subRouteName={project.name}
        />
      )}
    </>
  );
};
