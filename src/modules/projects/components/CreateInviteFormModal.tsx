"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input";
import { FormButton } from "@/shared/ui/FormButton";
import { useProjects } from "../hooks/useProjects";
import { ProjectRoleType } from "../schemas/project-role";
import {
  CreateProjectInviteType,
  createProjectInviteSchema,
} from "../schemas/create-project-invite";
import Select from "react-select";
import { formSelectStyling } from "../const/formSelectStyling";
import { ModalPortal } from "@/shared/ui/ModalPortal";

interface Props {
  projectId: string;
  roles: ProjectRoleType[];
  handleCloseModal: VoidFunction;
}

export const CreateInviteFormModal = ({
  projectId,
  roles,
  handleCloseModal,
}: Props) => {
  const form = useForm<CreateProjectInviteType>({
    resolver: zodResolver(createProjectInviteSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const selectableRoles = roles.filter((role) => role.isCreatorRole == false);

  const { createNewInvite } = useProjects();

  return (
    <ModalPortal
      closeFn={handleCloseModal}
      headingText="Invite a user to the project"
      wrapperStyling="mx-3 px-8 py-4 w-full md:w-[500px] overflow-scroll flex flex-col"
    >
      <form>
        <Input
          name="invitedUserEmail"
          placeholder="Enter a user's email"
          type="text"
          register={register}
          hasError={Boolean(errors.invitedUserEmail)}
          errorMessage={errors.invitedUserEmail?.message}
          customStyling="md:min-w-[420px] md:w-1/2"
          label="User's email"
        />
        <div className="mt-4">
          <label htmlFor="status" className="text-sm text-primary-dark-1">
            Role
          </label>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Select
                instanceId="role-select"
                options={selectableRoles}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                value={selectableRoles.find(
                  (status) => status.id === field.value,
                )}
                onChange={(selected) => field.onChange(selected?.id)}
                classNames={formSelectStyling}
                className="md:min-w-[420px] md:w-1/2"
              />
            )}
          />
        </div>

        <FormButton
          title="Invite"
          onClick={handleSubmit((data) => createNewInvite(projectId, data))}
        />
      </form>
    </ModalPortal>
  );
};
