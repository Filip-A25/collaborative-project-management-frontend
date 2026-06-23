import { cookies } from "next/headers";
import { Project } from "../types/project";

const API_URL = process.env.API_URL;
const PROJECTS_PATH = "/projects";

export async function getUserProjects() {
  try {
    const endpoint = `${API_URL}${PROJECTS_PATH}`;

    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData: ApiResponse<Project[]> = await response.json();

    if (!responseData.success) {
      throw new Error("Something went wrong while trying to fetch projects.");
    }

    return responseData.data;
  } catch {
    throw new Error("Something went wrong while trying to fetch projects.");
  }
}
