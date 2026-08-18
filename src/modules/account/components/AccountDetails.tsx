"use client";

import { useAuthStore } from "@/modules/auth/authStore";
import { useForm } from "react-hook-form";
import { UpdateUserType, updateUserSchema } from "../schemas/update-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton } from "@/shared/ui/FormButton";
import { Input } from "@/shared/ui/Input";
import { useAccount } from "../hooks/useAccount";
import { useEffect } from "react";

export const AccountDetails = () => {
  const user = useAuthStore((store) => store.user);
  const { updateUserData } = useAccount();

  const form = useForm<UpdateUserType>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    },
    resolver: zodResolver(updateUserSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, form]);

  if (!user) return;

  return (
    <form>
      <Input
        name="firstName"
        placeholder="Change your first name"
        type="text"
        register={register}
        hasError={Boolean(errors.firstName)}
        errorMessage={errors.firstName?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="First name"
      />
      <Input
        name="lastName"
        placeholder="Change your last name"
        type="text"
        register={register}
        hasError={Boolean(errors.lastName)}
        errorMessage={errors.lastName?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Last name"
      />
      <Input
        name="username"
        placeholder="Change your username"
        type="text"
        register={register}
        hasError={Boolean(errors.username)}
        errorMessage={errors.username?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Username"
      />
      <Input
        name="email"
        placeholder="Change your email"
        type="text"
        register={register}
        hasError={Boolean(errors.email)}
        errorMessage={errors.email?.message}
        customStyling="md:min-w-[420px] md:w-1/2"
        label="Email"
      />
      <FormButton title="Submit" onClick={handleSubmit(updateUserData)} />
    </form>
  );
};
