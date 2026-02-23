import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { access_token} = await request.json();

    if (!access_token) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });

    const isProd = process.env.NODE_ENV === "production";


    response.cookies.set("access_token", access_token, {
      httpOnly: false,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });



    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
