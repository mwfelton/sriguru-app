import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "../../../lib/cognito";

interface ForgotPasswordRequestBody {
  email: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ForgotPasswordRequestBody = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await forgotPassword(body.email);

    const response = NextResponse.json({ message: "Password reset link sent successfully!" });

    // Use the correct argument structure for setting the cookie
    response.cookies.set("userEmail", body.email, {
      httpOnly: true, // Inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 300, // Valid for 5 minutes
    });

    return response;
  } catch (error) {
    const errorMessage = (error as { message?: string }).message || "Failed to send reset link";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
