import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "../../../lib/cognito";

export async function POST(req: NextRequest) {  // NextRequest in App Router
  const { email } = await req.json();
  
  try {
    await forgotPassword(email);
    return NextResponse.json({ message: "Password reset link sent successfully!" });
  } catch (error) {
    const errorMessage = (error as { message?: string }).message || "Failed to send reset link";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
}
}
