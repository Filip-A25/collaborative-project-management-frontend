"use client";

import { Project } from "../types/project";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTaskStore } from "@/modules/tasks/store/taskStore";
import dynamic from "next/dynamic";

const CreateTaskFormModal = dynamic(
  () =>
    import("@/modules/tasks/components/CreateTaskFormModal").then(
      (module) => module.CreateTaskFormModal,
    ),
  { ssr: false },
);

const UpdateTaskFormModal = dynamic(
  () =>
    import("@/modules/tasks/components/UpdateTaskFormModal").then(
      (module) => module.UpdateTaskFormModal,
    ),
  { ssr: false },
);

const TaskInfoCard = dynamic(
  () =>
    import("@/modules/tasks/components/TaskInfoCard").then(
      (module) => module.TaskInfoCard,
    ),
  { ssr: false },
);

const CreateInviteFormModal = dynamic(
  () =>
    import("./CreateInviteFormModal").then(
      (module) => module.CreateInviteFormModal,
    ),
  { ssr: false },
);

const CreateTaskTypeFormModal = dynamic(
  () =>
    import("@/modules/tasks/components/CreateTaskTypeFormModal").then(
      (module) => module.CreateTaskTypeFormModal,
    ),
  { ssr: false },
);

const TaskTypesList = dynamic(
  () =>
    import("@/modules/tasks/components/TaskTypesList").then(
      (module) => module.TaskTypesList,
    ),
  { ssr: false },
);

interface Props {
  project: Project;
}

export const ProjectModalsContainer = ({ project }: Props) => {
  const modalPayload = useModalStore((store) => store.payload);
  const closeModal = useModalStore((store) => store.closeModal);

  const taskTypes = useTaskStore((store) => store.taskTypes);

  const handleCloseModal = () => {
    closeModal();
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {modalPayload.type === "createTask" && (
        <CreateTaskFormModal
          projectData={project}
          handleCloseModal={handleCloseModal}
          taskTypes={taskTypes}
        />
      )}
      {modalPayload.type === "updateTask" && (
        <UpdateTaskFormModal
          taskData={modalPayload.data.task}
          projectData={project}
          handleCloseModal={handleCloseModal}
          taskTypes={taskTypes}
        />
      )}
      {modalPayload.type === "viewTask" && (
        <TaskInfoCard
          projectId={project.id}
          taskId={modalPayload.data.taskId}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalPayload.type === "inviteMember" && (
        <CreateInviteFormModal
          projectId={project.id}
          roles={project.roles}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalPayload.type === "createTaskType" && (
        <CreateTaskTypeFormModal
          projectId={project.id}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalPayload.type === "manageTaskTypes" && (
        <TaskTypesList
          projectId={project.id}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
