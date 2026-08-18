"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProjectType,
  createProjectSchema,
} from "../schemas/create-project";
import { Input } from "@/shared/ui/Input";
import { FormButton } from "@/shared/ui/FormButton";
import { useProjects } from "../hooks/useProjects";
import Select from "react-select";
import { useFieldArray, Controller } from "react-hook-form";
import { Permission } from "../types/permission";
import { NestedAddButton } from "@/shared/ui/NestedAddButton";
import { NestedRemoveButton } from "@/shared/ui/NestedRemoveButton";
import { currencyOptions } from "../const/currencyOptions";
import { formColorOptions } from "../const/roleColorOptions";
import { formSelectStyling } from "../const/formSelectStyling";

interface Props {
  permissionsData: Permission[];
}

export const CreateProjectForm = ({ permissionsData }: Props) => {
  const form = useForm<CreateProjectType>({
    defaultValues: {
      name: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      currency: "EUR",
      budgetAmount: 0,
      roles: [],
    },
    resolver: zodResolver(createProjectSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });

  const { createNewProject } = useProjects();

  return (
    <form>
      <Input
        name="name"
        placeholder="Enter a project name"
        type="text"
        register={register}
        hasError={Boolean(errors.name)}
        errorMessage={errors.name?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Name"
      />
      <Input
        name="description"
        placeholder="Enter project description"
        type="textarea"
        register={register}
        hasError={Boolean(errors.description)}
        errorMessage={errors.description?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Description"
      />
      <Input
        name="startDate"
        placeholder="Enter start date"
        type="date"
        register={register}
        hasError={Boolean(errors.startDate)}
        errorMessage={errors.startDate?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Start date"
      />
      <Input
        name="endDate"
        placeholder="Enter due date"
        type="date"
        register={register}
        hasError={Boolean(errors.endDate)}
        errorMessage={errors.endDate?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Due date"
      />
      <Input
        name="budgetAmount"
        placeholder="Enter budget amount"
        type="number"
        register={register}
        hasError={Boolean(errors.budgetAmount)}
        errorMessage={errors.budgetAmount?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Budget"
      />
      <div className="mt-4">
        <label htmlFor="currency" className="text-sm text-primary-dark-1">
          Budget currency
        </label>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              instanceId="currency-select"
              options={currencyOptions}
              defaultValue={currencyOptions[0]}
              value={currencyOptions.find(
                (currency) => currency.value === field.value,
              )}
              onChange={(selected) => field.onChange(selected?.value)}
              classNames={formSelectStyling}
              className="md:min-w-[420px] md:w-1/2"
            />
          )}
        />
      </div>

      <div className="md:mt-4">
        <p>Roles</p>
        {fields.map((field, index) => (
          <div key={field.id} className="pl-3">
            <Input
              name={`roles.${index}.name`}
              placeholder="Enter role name"
              type="text"
              register={register}
              hasError={Boolean(errors.roles?.[index]?.name)}
              errorMessage={errors.roles?.[index]?.name?.message}
              customStyling="md:w-[380px]"
              label="Name"
            />
            <div className="md:w-[380px] mt-4">
              <label
                htmlFor="permissions"
                className="text-sm text-primary-dark-1"
              >
                Role color
              </label>
              <Controller
                name={`roles.${index}.color`}
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId={`role-${index}-color-select`}
                    options={formColorOptions}
                    placeholder="Choose a role color"
                    value={formColorOptions.find(
                      (color) => color.value === field.value,
                    )}
                    onChange={(selected) => field.onChange(selected?.value)}
                    classNames={formSelectStyling}
                  />
                )}
              />
            </div>
            <div className="md:w-[380px] mt-4">
              <label
                htmlFor="permissions"
                className="text-sm text-primary-dark-1"
              >
                Permissions
              </label>
              <Controller
                name={`roles.${index}.permissions`}
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId={`role-${index}-permissions-select`}
                    closeMenuOnSelect={false}
                    isMulti
                    options={permissionsData}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    placeholder="Add permissions for the role"
                    classNames={formSelectStyling}
                    value={permissionsData.filter((o) =>
                      field.value?.some((v) => v.id === o.id),
                    )}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
            </div>
            <NestedRemoveButton clickFn={() => remove(index)} />
          </div>
        ))}
        <NestedAddButton
          label="Add role"
          clickFn={() =>
            append({
              name: "",
              color: "",
              permissions: [],
            })
          }
        />
      </div>

      <FormButton title="Submit" onClick={handleSubmit(createNewProject)} />
    </form>
  );
};
