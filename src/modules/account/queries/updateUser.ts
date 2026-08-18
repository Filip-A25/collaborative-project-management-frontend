"use server";

import { UpdateUserType } from "../schemas/update-user";
import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";

export async function updateUser(data: UpdateUserType) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const reqBodyJson = JSON.stringify(data);

    const response = await fetch(API_ENDPOINTS.Auth, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: reqBodyJson,
    });

    const responseData: ApiResponse<User> = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to update user.");
  }
}
