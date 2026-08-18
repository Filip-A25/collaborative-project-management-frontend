"use client";

import { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";
import { LayoutHeading } from "@/shared/ui/LayoutHeading";
import { sidebarItems } from "../const/sidebarItems";
import clsx from "clsx";

interface Props {
  projects?: Project[];
}

export const ProjectsOverview = ({ projects }: Props) => {
  const sidebarItem = sidebarItems.find((item) => item.name === "Projects");
  const headingText = Boolean(projects?.length)
    ? `${projects?.length} Projects`
    : "You don't have any projects yet.";

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
        />
      )}
      <section className="flex flex-col gap-4 px-4 mt-24 pb-20 md:pl-0 md:mt-12 lg:grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 min-w-0 lg:gap-3">
        <h2
          className={clsx(
            "text-lg font-semibold md:hidden",
            Boolean(projects?.length)
              ? "text-primary-dark-1/70"
              : "pt-10 text-center text-muted-1",
          )}
        >
          {headingText}
        </h2>
        {projects?.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </section>
    </>
  );
};
