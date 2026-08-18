"use client";

import { updateUser } from "../queries/updateUser";
import { UpdateUserType } from "../schemas/update-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/authStore";

export const useAccount = () => {
  const router = useRouter();
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);

  const updateUserData = async (data: UpdateUserType) => {
    const response: ApiResponse<User> = await updateUser(data);

    if (!response.success || !response.data) {
      toast.error(response.message);
      return;
    }

    if (!user) {
      setUser(response.data);
    } else {
      const newUserData: User = {
        ...user,
        firstName: response.data?.firstName ?? "",
        lastName: response.data?.lastName ?? "",
        username: response.data?.username ?? "",
        email: response.data?.email,
      };

      setUser(newUserData);
    }

    toast.success(response.message);
    router.refresh();
  };

  return { updateUserData };
};
