"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";

export async function getAllTaskComments(
  projectId: string,
  taskId: string,
): Promise<TaskComment[]> {
  try {
    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}/tasks/${taskId}/comments`;

    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const responseData: ApiResponse<TaskComment[]> = await response.json();

    if (!responseData) {
      throw new Error(
        "Something went wrong while trying to fetch task comments.",
      );
    }

    return responseData.data ?? [];
  } catch {
    throw new Error(
      "Something went wrong while trying to fetch task comments.",
    );
  }
}
