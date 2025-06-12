import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export async function GET() {
    try {
        // Clear the login cookie
        const response = NextResponse.json({ message: "Logged out successfully!" });
        response.headers.set("Set-Cookie", "user=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict");

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}
