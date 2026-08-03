"use server";

import { API_ENDPOINTS } from "@/shared/const/apiEndpoints";
import { cookies } from "next/headers";
import { CreateProjectType } from "../schemas/create-project";

export async function createProject(data: CreateProjectType) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const reqBodyJson = JSON.stringify(data);

    const response = await fetch(API_ENDPOINTS.Projects, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: reqBodyJson,
    });

    const responseData: ApiResponse<any> = await response.json();

    return responseData;
  } catch (error: unknown) {
    throw new Error("Something went wrong while trying to create project.");
  }
}
