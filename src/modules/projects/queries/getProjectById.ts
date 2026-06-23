import { cookies } from "next/headers";
import { Project } from "../types/project";

const API_URL = process.env.API_URL;
const PROJECTS_PATH = "/projects";

export async function getProjectById(id: string) {
  try {
    const endpoint = `${API_URL}${PROJECTS_PATH}/${id}`;

    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value ?? null;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData: ApiResponse<Project> = await response.json();

    if (!responseData) {
      throw new Error("Something went wrong while trying to fetch a project.");
    }

    return responseData.data;
  } catch {
    throw new Error("Something went wrong while trying to fetch a project.");
  }
}
