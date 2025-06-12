import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/lib/DbConnect"; // ✅ Import your database connection

export async function POST(req) {
    try {
        const { productName, productPrice } = await req.json();

        // ✅ Get user email from cookies (App Router format)
        const userEmail = req.cookies.get("user")?.value;

        if (!userEmail) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        // ✅ Fetch user details from MySQL
        const [rows] = await db.execute(
            "SELECT name, email, place, state, country, phone FROM users WHERE email = ?",
            [userEmail]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const user = rows[0]; // Get user details
        const adminEmail = "XXXX@gmail.com"; // Replace with actual admin email

        // ✅ Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER, // Your email
                pass: process.env.GMAIL_APP_PASS,   // Your email password
            },
        });

        // ✅ Email to Admin
        await transporter.sendMail({
            from: "XXXX@gmail.com",
            to: adminEmail,
            subject: "New Order Received - Petto",
            text: `
            A new order has been placed.
            
            Customer Details:
            Name: ${user.name}
            Email: ${user.email}
            Location: ${user.place}, ${user.state}, ${user.country}
            Phone: ${user.phone}
            
            Ordered Product:
            Product Name: ${productName}
            Price: ${productPrice}
        `,
        });

        // ✅ Email to Customer
        await transporter.sendMail({
            from: "XXXX@gmail.com",
            to: user.email,
            subject: "Order Confirmation - Petto",
            text: `Hello ${user.name},\n\nYour order for "${productName}" has been successfully placed!\n\nThank you for shopping with Petto.\n\nBest regards,\nPetto Team`,
        });

        return NextResponse.json({ message: "Order placed successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Order Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
