"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";
import { CreateTaskType } from "../schemas/create-task";
import { Task } from "../types/task";

export async function createTask(projectId: string, data: CreateTaskType) {
  try {
    const endpoint = `${API_ENDPOINTS.Projects}/${projectId}/tasks`;

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

    const responseData: ApiResponse<Task> = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to create task.");
  }
}
