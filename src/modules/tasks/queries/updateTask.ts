"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";
import { UpdateTaskType } from "../schemas/update-task";
import { Task } from "../types/task";

export async function updateTask(
  projectId: string,
  taskId: string,
  data: UpdateTaskType,
) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const reqBodyJson = JSON.stringify(data);

    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}/tasks/${taskId}`;

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: reqBodyJson,
    });

    const responseData: ApiResponse<Task> = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to update task.");
  }
}
