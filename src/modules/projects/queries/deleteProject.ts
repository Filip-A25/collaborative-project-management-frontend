"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";

export async function deleteProject(projectId: string) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData: ApiResponse = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to delete the project.");
  }
}
