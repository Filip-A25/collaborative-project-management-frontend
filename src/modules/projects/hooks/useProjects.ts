"use client";

import { CreateProjectType } from "../schemas/create-project";
import { createProject } from "../queries/createProject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { deleteProject } from "../queries/deleteProject";
import { removeProjectMember } from "../queries/removeProjectMember";
import { updateProject } from "../queries/updateProject";
import { UpdateProjectType } from "../schemas/update-project";

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

  const deleteProjectWithId = async (projectId: string) => {
    const response = await deleteProject(projectId);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    return router.push(PRIVATE_ROUTES.Projects);
  };

  const removeProjectMemberWithId = async (
    projectId: string,
    memberId: number,
  ) => {
    const response = await removeProjectMember(projectId, memberId);

    if (!response.success) {
      toast.error(response.message);
    }

    toast.success(response.message);
  };

  const updateCurrentProject = async (data: UpdateProjectType) => {
    const projectId = data.id ?? null;

    if (!projectId) return;

    const response = await updateProject(data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.message) {
      toast.success(response.message);
    }

    const redirectRoute = `${PRIVATE_ROUTES.Projects}/${projectId}`;
    return router.push(redirectRoute);
  };

  return {
    createNewProject,
    deleteProjectWithId,
    removeProjectMemberWithId,
    updateCurrentProject,
  };
};
