"use client";

import { useAuthStore } from "@/modules/auth/authStore";
import { useEffect } from "react";

interface Props {
  userData: User | null;
}

export const Header = ({ userData }: Props) => {
  const setUser = useAuthStore((store) => store.setUser);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    if (!user) {
      setUser(userData);
    }
  }, [user, setUser, userData]);

  return <nav></nav>;
};
