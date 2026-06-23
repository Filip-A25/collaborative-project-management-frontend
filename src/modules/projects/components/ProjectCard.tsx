"use client";

import { Project } from "../types/project";
import { format } from "date-fns";
import clsx from "clsx";
import { Status } from "../types/project";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";

interface Props {
  data: Project;
}

const getStatusTextStyling = (status: Status) => {
  switch (status) {
    case "OnHold":
      return "text-slate-500 border-slate-500";
    case "Planning":
      return "text-purple-700 border-purple-700";
    case "Active":
      return "text-emerald-600 border-emerald-600";
    case "Completed":
      return "text-amber-500 border-amber-500";
  }
};

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
    <article className="bg-white rounded-lg md:h-[320px] xl:h-[340px]">
      <Link
        href={`${PRIVATE_ROUTES.Projects}/${data.id}`}
        className="flex flex-col w-full h-full items-start cursor-pointer rounded-lg md:px-8 md:py-5 text-primary-dark-1 border border-gray-200 hover:border-gray-300 hover:shadow-md focus:shadow-md [--tw-shadow-color:rgb(0,0,0,0.03)] transition-all duration-200 ease-in-out"
      >
        <header className="flex justify-between items-start gap-4 w-full xl:h-16">
          <h3 className="text-2xl font-medium text-start line-clamp-2">
            {data.name}
          </h3>
          <p
            className={clsx(
              "text-[11px] border rounded-full px-2",
              getStatusTextStyling(data.status),
            )}
          >
            {projectStatus}
          </p>
        </header>
        <p className="md:mt-4 md:mb-2 md:text-xs text-start line-clamp-4">
          {data.description}
        </p>
        <div className="mt-auto">
          <div className="flex items-center gap-4">
            <progress
              value={data.completionPercentage}
              max={100}
              className="rounded-full overflow-hidden h-2 md:mt-4 md:mb-4 [&::-webkit-progress-bar]:bg-muted-1/20 [&::-webkit-progress-value]:bg-primary-2"
            />
            <p className="text-xs text-primary-dark-1/60 text-start">
              {completionProgress}
            </p>
          </div>
          <div className="flex md:gap-10 md:py-4">
            <span>
              <p className="text-xs text-start opacity-50">Start date</p>
              <p className="text-sm">{startDate}</p>
            </span>
            <span>
              <p className="text-xs text-start opacity-50">End date</p>
              <p className="text-sm">{endDate}</p>
            </span>
          </div>
          <div>
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
