import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    return NextResponse.json({
      success: true,
      message: "Successfully logged out.",
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Something went wrong while trying to logout.",
    });
  }
}
