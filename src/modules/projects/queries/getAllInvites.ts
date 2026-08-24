"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";

export async function getAllInvites() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const response = await fetch(API_ENDPOINTS.UserInvites, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData: ApiResponse<ProjectInvite[]> = await response.json();

    if (!responseData.success) {
      throw new Error("Something went wrong while trying to fetch invites.");
    }

    return responseData.data;
  } catch {
    throw new Error("Something went wrong while trying to fetch invites.");
  }
}
