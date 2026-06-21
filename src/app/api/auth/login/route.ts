import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LoginResponse } from "@/modules/auth/types/response";

const API_URL = process.env.API_URL;
const LOGIN_PATH = "/users/login";

export async function POST(request: NextRequest) {
  try {
    const endpoint = `${API_URL}${LOGIN_PATH}`;

    const reqData = await request.json();
    const reqDataJosn = JSON.stringify(reqData);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqDataJosn,
    });

    const responseData: ApiResponse<LoginResponse> = await response.json();

    if (!responseData.success || !responseData.data) {
      return NextResponse.json({
        success: false,
        message: responseData.message,
      });
    }

    const { token, ...rest } = responseData.data;

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: responseData.message,
      data: rest,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Something went wrong while trying to login.",
    });
  }
}
