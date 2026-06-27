"use client";

import { FormLayout } from "@/shared/ui/FormLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProjectType,
  createProjectSchema,
} from "../schemas/create-project";
import { Input } from "@/shared/ui/Input";

export const CreateProjectForm = () => {
  const form = useForm<CreateProjectType>({
    defaultValues: {
      name: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      currency: "EUR",
      budgetAmount: 0,
    },
    resolver: zodResolver(createProjectSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <FormLayout title="Create a project">
      <form>
        <Input
          name="name"
          placeholder="Enter a project name"
          type="text"
          register={register}
          hasError={Boolean(errors.name)}
          errorMessage={errors.name?.message}
        />
        <Input
          name="name"
          placeholder="Enter project description"
          type="textarea"
          register={register}
          hasError={Boolean(errors.description)}
          errorMessage={errors.description?.message}
        />
      </form>
    </FormLayout>
  );
};
