"use server";

import { cookies } from "next/headers";
import { Permission } from "../types/permission";

const API_URL = process.env.API_URL;
const PERMISSIONS_PATH = "/permissions";

export async function getAllPermissions(): Promise<Permission[]> {
  try {
    const endpoint = `${API_URL}${PERMISSIONS_PATH}`;

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

    const responseData: ApiResponse<Permission[]> = await response.json();

    if (!responseData) {
      throw new Error(
        "Something went wrong while trying to fetch permissions.",
      );
    }

    return responseData.data ?? [];
  } catch (error: unknown) {
    throw new Error("Something went wrong while trying to fetch permissions.");
  }
}
