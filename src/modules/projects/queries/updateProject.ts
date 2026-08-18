"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";
import { UpdateProjectType } from "../schemas/update-project";

export async function updateProject(data: UpdateProjectType) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const reqBodyJson = JSON.stringify(data);

    const endpoint = `${API_ENDPOINTS.Projects}/${data.id}`;

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: reqBodyJson,
    });

    const responseData: ApiResponse = await response.json();

    return responseData;
  } catch {
    throw new Error("Something went wrong while trying to create project.");
  }
}
