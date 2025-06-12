import db from "@/lib/DbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Find user by email
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (user.length === 0) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        const userData = user[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
        }

        // If successful, return user info (excluding password)
        return NextResponse.json({ message: "Login successful!", user: { email: userData.email, name: userData.name } });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
