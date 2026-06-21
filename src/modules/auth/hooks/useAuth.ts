"use client";

import { LoginType, RegisterType } from "../schemas/auth";
import { useRouter } from "next/navigation";
import { ANONYMOUS_ROUTES, PRIVATE_ROUTES } from "@/const/Routes";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const onRegister = async (data: RegisterType) => {
    const jsonRegisterData = JSON.stringify(data);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonRegisterData,
    });

    const responseData = await response.json();

    if (!responseData.success) {
      toast.error(responseData.message);
      return;
    }

    toast.success(responseData.message);
    router.push(ANONYMOUS_ROUTES.Login);
  };

  const onLogin = async (data: LoginType) => {
    const jsonLoginData = JSON.stringify(data);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonLoginData,
    });

    const responseData = await response.json();

    if (!responseData.success) {
      toast.error(responseData.message);
      return;
    }

    toast.success(responseData.message);
    router.push(PRIVATE_ROUTES.Projects);
  };

  const onLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    if (!responseData.success) {
      toast.error(responseData.message);
      return;
    }

    toast.success("Successfully logged out.");
    router.push(ANONYMOUS_ROUTES.Login);
  };

  return { onRegister, onLogin, onLogout };
};
