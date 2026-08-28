"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";
import { CreateTaskTypeSchema } from "../schemas/create-task-type";

export async function createTaskType(
  projectId: string,
  data: CreateTaskTypeSchema,
) {
  try {
    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}/task-types`;

    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const reqBodyJson = JSON.stringify(data);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: reqBodyJson,
    });

    const responseData: ApiResponse<TaskType> = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to create a task type.");
  }
}
