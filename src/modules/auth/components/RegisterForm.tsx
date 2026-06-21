"use client";

import { FormLayout } from "@/shared/ui/FormLayout";
import { useForm } from "react-hook-form";
import { RegisterType, registerSchema } from "../schemas/auth";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/shared/ui/Input";
import { FormButton } from "@/shared/ui/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ANONYMOUS_ROUTES } from "@/const/Routes";

export const RegisterForm = () => {
  const form = useForm<RegisterType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { onRegister } = useAuth();

  return (
    <FormLayout title="Create an account">
      <form className="flex flex-col justify-center">
        <Input
          name="firstName"
          placeholder="Enter your first name"
          type="text"
          register={register}
          hasError={Boolean(errors.firstName)}
          errorMessage={errors.firstName?.message}
          group="auth"
        />
        <Input
          name="lastName"
          placeholder="Enter your last name"
          type="text"
          register={register}
          hasError={Boolean(errors.lastName)}
          errorMessage={errors.lastName?.message}
          group="auth"
        />
        <Input
          name="username"
          placeholder="Enter your username"
          type="text"
          register={register}
          hasError={Boolean(errors.username)}
          errorMessage={errors.username?.message}
          group="auth"
        />
        <Input
          name="email"
          placeholder="Enter your email"
          type="email"
          register={register}
          hasError={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          group="auth"
        />
        <Input
          name="password"
          placeholder="Enter a password"
          type="password"
          register={register}
          hasError={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          group="auth"
        />
        <FormButton title="Register" onClick={handleSubmit(onRegister)} />
        <p className="text-sm text-center mt-3 text-primary-dark-2">
          Already have an account?{" "}
          <Link
            href={ANONYMOUS_ROUTES.Login}
            className=" text-primary-2 hover:text-primary-1 transition-colors duration-150 ease-in-out"
          >
            Log in.
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};
