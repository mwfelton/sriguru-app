import { NextRequest, NextResponse } from "next/server";
import { confirmForgotPassword } from "../../../lib/cognito";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password, code } = await req.json();

  // Retrieve email from cookies
  const cookieStore = cookies();
  const email = cookieStore.get("userEmail")?.value;

  if (!email) {
    return NextResponse.json({ error: "Email is missing or invalid." }, { status: 400 });
  }

  try {
    // Use the email from the cookie
    await confirmForgotPassword(email, password, code);

    // Clear the cookie after successful reset
    const response = NextResponse.json({ message: "Password reset successfully!" });
    response.cookies.set("userEmail", "", { maxAge: 0 }); // Deleting the cookie
    return response;
  } catch (error) {
    const errorMessage = (error as { message?: string }).message || "Failed to reset password";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
