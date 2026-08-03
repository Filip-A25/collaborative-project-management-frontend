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

interface Props {
  permissionsData: Permission[];
}

const CURRENCIES = [
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "GBP",
    value: "GBP",
  },
];

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
        customStyling="md:min-w-[380px] md:w-2/5"
        label="Name"
      />
      <Input
        name="description"
        placeholder="Enter project description"
        type="textarea"
        register={register}
        hasError={Boolean(errors.description)}
        errorMessage={errors.description?.message}
        customStyling="md:min-w-[380px] md:w-2/5"
        label="Description"
      />
      <Input
        name="startDate"
        placeholder="Enter start date"
        type="date"
        register={register}
        hasError={Boolean(errors.startDate)}
        errorMessage={errors.startDate?.message}
        customStyling="md:min-w-[380px] md:w-2/5"
        label="Start date"
      />
      <Input
        name="endDate"
        placeholder="Enter due date"
        type="date"
        register={register}
        hasError={Boolean(errors.endDate)}
        errorMessage={errors.endDate?.message}
        customStyling="md:min-w-[380px] md:w-2/5"
        label="Due date"
      />
      <Input
        name="budgetAmount"
        placeholder="Enter budget amount"
        type="number"
        register={register}
        hasError={Boolean(errors.budgetAmount)}
        errorMessage={errors.budgetAmount?.message}
        customStyling="md:min-w-[380px] md:w-2/5"
        label="Budget"
      />
      <div className="mt-4">
        <label htmlFor="currency" className="text-sm text-primary-dark-1">
          Budget currency
        </label>
        <Select
          defaultValue={CURRENCIES[0]}
          options={CURRENCIES}
          classNames={{
            container: () => "mt-1",
            placeholder: () => "text-sm",
            singleValue: () => "text-sm",
            option: () => "text-sm",
          }}
          className="md:min-w-[380px] md:w-2/5"
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
              customStyling="md:w-[320px]"
              label="Name"
            />
            <Input
              name={`roles.${index}.color`}
              placeholder="Enter role color"
              type="text"
              register={register}
              hasError={Boolean(errors.budgetAmount)}
              errorMessage={errors.roles?.[index]?.name?.message}
              customStyling="md:w-[320px]"
              label="Color"
            />
            <div className="md:w-[320px] mt-4">
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
                    closeMenuOnSelect={false}
                    isMulti
                    options={permissionsData}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    placeholder="Add permissions for the role"
                    classNames={{
                      container: () => "mt-1 cursor-pointer",
                      placeholder: () => "text-sm",
                      singleValue: () => "text-sm",
                      option: () => "text-sm",
                    }}
                    value={permissionsData.filter((o) =>
                      field.value?.includes(o.id),
                    )}
                    onChange={(selected) =>
                      field.onChange(selected.map((s) => s.id))
                    }
                  />
                )}
              />
            </div>
            <NestedRemoveButton clickFn={() => remove(index)} />
          </div>
        ))}
        <NestedAddButton
          label="Add role"
          clickFn={() => append({ name: "", color: "", permissions: [] })}
        />
      </div>

      <FormButton title="Submit" onClick={handleSubmit(createNewProject)} />
    </form>
  );
};
