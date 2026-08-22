"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";

const API_URL = process.env.API_URL;

export async function getTaskTypes(projectId: string): Promise<TaskType[]> {
  try {
    const endpoint = `${API_URL}${API_ENDPOINTS.Projects}/${projectId}/task-types`;

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

    const responseData: ApiResponse<TaskType[]> = await response.json();

    if (!responseData) {
      throw new Error(
        "Something went wrong while trying to fetch permissions.",
      );
    }

    return responseData.data ?? [];
  } catch {
    throw new Error("Something went wrong while trying to fetch permissions.");
  }
}
