"use client";

import { FormLayout } from "@/shared/ui/FormLayout";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "../schemas/auth";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/shared/ui/Input";
import { FormButton } from "@/shared/ui/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ANONYMOUS_ROUTES } from "@/const/Routes";

export const LoginForm = () => {
  const form = useForm<LoginType>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { onLogin } = useAuth();

  return (
    <FormLayout title="Welcome back!">
      <form className="flex flex-col items-center">
        <Input
          name="emailOrUsername"
          placeholder="Enter your email or username"
          type="text"
          register={register}
          hasError={Boolean(errors.emailOrUsername)}
          errorMessage={errors.emailOrUsername?.message}
          group="auth"
        />
        <Input
          name="password"
          placeholder="Enter your password"
          type="password"
          register={register}
          hasError={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          group="auth"
        />
        <FormButton title="Login" onClick={handleSubmit(onLogin)} />
        <p className="text-sm text-center mt-3 text-primary-dark-2">
          Don&nbsp;t have an account?{" "}
          <Link
            href={ANONYMOUS_ROUTES.Register}
            className="text-primary-2 hover:text-primary-1 transition-colors duration-150 ease-in-out"
          >
            Register.
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};
