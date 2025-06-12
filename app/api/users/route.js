import db from "@/lib/DbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { name, email, place, state, country, phone, password } = await req.json();

    try {
        // Check if user already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return Response.json({ error: "User already exists!" }, { status: 400 });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        await db.query(
            "INSERT INTO users (name, email, place, state, country, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, email, place, state, country, phone, hashedPassword]
        );

        return Response.json({ message: "Account created successfully!" });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Database error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [users] = await db.query("SELECT * FROM users");
        return Response.json(users);
    } catch (error) {
        return Response.json({ error: "Database error" }, { status: 500 });
    }
}
