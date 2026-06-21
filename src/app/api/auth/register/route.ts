import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const REGISTER_PATH = "/users/register";

export async function POST(request: NextRequest) {
  try {
    const endpoint = `${API_URL}${REGISTER_PATH}`;

    const reqData = await request.json();
    const reqDataJson = JSON.stringify(reqData);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqDataJson,
    });

    const responseData: ApiResponse = await response.json();

    if (!responseData.success) {
      return NextResponse.json({
        success: false,
        message: responseData.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: responseData.message,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Something went wrong while trying to register.",
    });
  }
}
