import { NextRequest, NextResponse } from "next/server";
import { confirmForgotPassword } from "../../../lib/cognito";

export async function POST(req: NextRequest) {
  const { email, password, code } = await req.json();

  try {
    await confirmForgotPassword(email, password, code);
    return NextResponse.json({ message: "Password reset successfully!" });
  } catch (error) {
    const errorMessage = (error as { message?: string }).message || "Failed to reset password";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
