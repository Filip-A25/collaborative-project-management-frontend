"use client";

import { Project } from "../types/project";
import { format } from "date-fns";
import clsx from "clsx";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { getStatusTextStyling } from "../lib/utils";

interface Props {
  data: Project;
}

export const ProjectCard = ({ data }: Props) => {
  const projectStatus = data.status === "OnHold" ? "On hold" : data.status;
  const startDate = format(new Date(data.startDate), "PP");
  const endDate = format(new Date(data.endDate), "PP");

  const projectCreator = data.projectMembers.find(
    (member) => member.projectRole?.isCreatorRole,
  );
  const fullCreatorName =
    projectCreator?.firstName + " " + projectCreator?.lastName;

  const completionProgress = `${data.completionPercentage}% Completed`;

  return (
    <article className="bg-white rounded-lg">
      <Link
        href={`${PRIVATE_ROUTES.Projects}/${data.id}`}
        className="flex flex-col w-full h-full items-start cursor-pointer rounded-lg px-6 py-4 gap-4 min-h-[200px] md:h-[320px] xl:h-[340px] md:gap-0 md:px-8 md:py-5 text-primary-dark-1 border border-gray-200 hover:border-gray-300 hover:shadow-md focus:shadow-md [--tw-shadow-color:rgb(0,0,0,0.03)] transition-all duration-200 ease-in-out"
      >
        <header className="flex justify-between items-start gap-2 w-full xl:h-16">
          <h3 className="text-xl font-semibold md:text-2xl md:font-medium text-start line-clamp-2">
            {data.name}
          </h3>
          <p
            className={clsx(
              "text-[11px] border rounded-full px-2 max-md:mt-1",
              getStatusTextStyling(data.status),
            )}
          >
            {projectStatus}
          </p>
        </header>
        <p className="hidden md:block md:mt-4 md:mb-2 md:text-xs text-start md:line-clamp-4 line-clamp-3">
          {data.description}
        </p>
        <div className="w-full md:mt-auto md:w-unset">
          <div className="flex items-center gap-4">
            <progress
              value={data.completionPercentage}
              max={100}
              className="rounded-full overflow-hidden w-2/3 h-2 md:mt-4 md:mb-4 [&::-webkit-progress-bar]:bg-muted-1/20 [&::-webkit-progress-value]:bg-primary-2"
            />
            <p className="text-xs text-primary-dark-1/60 text-start">
              {completionProgress}
            </p>
          </div>
          <div className="flex w-full gap-12 mt-4 md:mt-0 md:w-fit md:gap-10 md:py-4">
            <span>
              <p className="text-xs text-start opacity-50">Start date</p>
              <p className="text-sm">{startDate}</p>
            </span>
            <span>
              <p className="text-xs text-start opacity-50">End date</p>
              <p className="text-sm">{endDate}</p>
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-start opacity-50">Creator</p>
            <p className="text-sm text-start text-primary-1 font-medium">
              {fullCreatorName}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
