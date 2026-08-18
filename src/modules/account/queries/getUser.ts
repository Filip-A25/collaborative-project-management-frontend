"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const response = await fetch(API_ENDPOINTS.Auth, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData: ApiResponse<User> = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to fetch the user.");
  }
}
