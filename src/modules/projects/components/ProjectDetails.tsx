"use client";

import { Project } from "../types/project";
import { sidebarItems } from "../const/sidebarItems";
import { LayoutHeading } from "@/shared/ui/LayoutHeading";
import { getStatusTextStyling } from "../lib/utils";
import clsx from "clsx";
import { CompletionProgress } from "./CompletionProgress";
import { ProjectInfoGrid } from "./ProjectInfoGrid";
import { ProjectMembersList } from "./ProjectMembersList";
import { DeleteForever, PersonAdd, ExitToApp } from "@mui/icons-material";
import { useProjects } from "../hooks/useProjects";
import { useMemberStore } from "../stores/memberStore";
import { useAuthStore } from "@/modules/auth/authStore";
import { useEffect, useState } from "react";
import { ProjectMember } from "../types/projectMember";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { useProjectAuthorization } from "../hooks/useProjectAuthorization";
import { PermissionName } from "../types/permissionName";
import { TasksOverview } from "@/modules/tasks/components/TasksOverview";
import { Task } from "@/modules/tasks/types/task";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTaskStore } from "@/modules/tasks/store/taskStore";
import { ProjectModalsContainer } from "./ProjectModalsContainer";
import dynamic from "next/dynamic";

const ProjectMembersModal = dynamic(
  () =>
    import("./ProjectMembersModal").then(
      (module) => module.ProjectMembersModal,
    ),
  { ssr: false },
);

interface Props {
  project: Project;
  tasks: Task[];
  taskTypes: TaskType[];
}

export const ProjectDetails = ({ project, tasks, taskTypes }: Props) => {
  const [projectMembers, setProjectMembers] = useState<
    ProjectMember[] | undefined
  >(project.projectMembers);

  const modalPayload = useModalStore((store) => store.payload);
  const closeModalFn = useModalStore((store) => store.closeModal);
  const openModal = useModalStore((store) => store.openModal);
  const setTasks = useTaskStore((store) => store.setTasks);
  const setTaskTypes = useTaskStore((store) => store.setTaskTypes);

  const sidebarItem = sidebarItems.find((item) => item.name === "Projects");
  const projectStatus =
    project.status === "OnHold" ? "On hold" : project.status;
  const editRoute = `${PRIVATE_ROUTES.Projects}/${project.id}/update`;

  const user = useAuthStore((store) => store.user);
  const member = useMemberStore((store) => store.member);
  const setMember = useMemberStore((store) => store.setMember);

  const { deleteProjectWithId, removeMember } = useProjects();
  const { doesUserHaveProjectPermission } = useProjectAuthorization();

  const handleRemovedMember = (memberId: number) => {
    setProjectMembers((prev) =>
      prev?.filter((member) => member.id !== memberId),
    );
  };

  const handleCloseModal = () => {
    closeModalFn();
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (projectMembers && user) {
      const userMember =
        projectMembers.find((member) => member.userId === user.id) ?? null;

      setMember(userMember);
    }
  }, [user, projectMembers, setMember]);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  useEffect(() => {
    setTaskTypes(taskTypes);
  }, [taskTypes, setTaskTypes]);

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
          subRouteName={project.name}
        />
      )}
      <section className="px-4 mt-24 pb-20 md:mt-8">
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
          <div className="flex flex-col md:min-w-[140px] lg:min-w-[180px] xl:min-w-[200px]">
            <CompletionProgress
              completionPercentage={project.completionPercentage}
            />
            <div className="flex flex-col sm:flex-row sm:gap-2 md:grid md:grid-cols-2">
              {doesUserHaveProjectPermission(PermissionName.ManageProject) && (
                <>
                  <Link
                    className="flex gap-1 cursor-pointer group w-full justify-center rounded-lg  max-md:border-primary-2 max-md:text-primary-2 border md:hover:border-primary-2 border-muted-1 outline-none items-end max-md:hover:border-primary-2 py-0.5 max-md:mt-3 text-xs text-muted-1 hover:text-primary-2"
                    href={editRoute}
                  >
                    <EditIcon
                      fontSize="small"
                      className="max-md:text-primary-2 text-muted-1 group-hover:text-primary-2"
                    />
                    Edit
                  </Link>
                  <button
                    className="flex gap-1 cursor-pointer group w-full justify-center rounded-lg max-md:border-red-500 max-md:text-red-500 border md:hover:border-red-500 md:border-muted-1 outline-none items-end max-md:hover:border-red-500 py-0.5 max-md:mt-3 text-xs text-muted-1 hover:text-red-500"
                    onClick={() => deleteProjectWithId(project.id)}
                  >
                    <DeleteForever
                      fontSize="small"
                      className="max-md:text-red-500 text-muted-1 group-hover:text-red-500"
                    />
                    Delete
                  </button>
                </>
              )}
              {doesUserHaveProjectPermission(PermissionName.InviteMembers) && (
                <button
                  className="flex gap-1 col-span-2 cursor-pointer group w-full justify-center rounded-lg max-md:border-primary-2 max-md:text-primary-2 border md:hover:border-primary-2 md:border-muted-1 outline-none items-end max-md:hover:border-primary-2 py-0.5 max-md:mt-3 text-xs text-muted-1 hover:text-primary-2"
                  onClick={() => openModal({ type: "inviteMember" })}
                >
                  <PersonAdd
                    fontSize="small"
                    className="max-md:text-primary-2 text-muted-1 group-hover:text-primary-2"
                  />
                  Add member
                </button>
              )}
              {member && !Boolean(member.projectRole?.isCreatorRole) && (
                <button
                  className="flex gap-1 col-span-2 cursor-pointer group w-full justify-center rounded-lg max-md:border-red-600 max-md:text-red-600 border md:hover:border-red-600 md:border-muted-1 outline-none items-end max-md:hover:border-red-600 py-0.5 max-md:mt-3 text-xs text-muted-1 hover:text-red-600"
                  onClick={() => removeMember(project.id, member?.id)}
                >
                  <ExitToApp
                    fontSize="small"
                    className="max-md:text-red-600 text-muted-1 group-hover:text-red-600"
                  />
                  Leave project
                </button>
              )}
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-6 mt-8 md:gap-0 md:mt-8 md:items-end">
          <ProjectInfoGrid project={project} />
          <div className="flex max-xl:flex-col md:w-full gap-4 md:mt-8">
            <TasksOverview />
            {projectMembers && <ProjectMembersList members={projectMembers} />}
          </div>
        </section>
      </section>
      {projectMembers && modalPayload.type === "viewMembers" && (
        <ProjectMembersModal
          closeModal={handleCloseModal}
          members={projectMembers}
          projectId={project.id}
          handleRemovedMember={handleRemovedMember}
        />
      )}
      <ProjectModalsContainer project={project} />
    </>
  );
};
