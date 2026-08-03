"use client";

import { CreateProjectType } from "../schemas/create-project";
import { createProject } from "../queries/createProject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PRIVATE_ROUTES } from "@/const/Routes";

export const useProjects = () => {
  const router = useRouter();

  const createNewProject = async (data: CreateProjectType) => {
    const response = await createProject(data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    return router.push(PRIVATE_ROUTES.Projects);
  };

  return { createNewProject };
};
