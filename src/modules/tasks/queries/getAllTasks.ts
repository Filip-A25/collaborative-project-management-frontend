"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { Task } from "../types/task";

export async function getAllTasks(projectId: string): Promise<Task[]> {
  try {
    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}/tasks`;

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

    const responseData: ApiResponse<Task[]> = await response.json();

    if (!responseData) {
      throw new Error("Something went wrong while trying to fetch tasks.");
    }

    return responseData.data ?? [];
  } catch {
    throw new Error("Something went wrong while trying to fetch tasks.");
  }
}
