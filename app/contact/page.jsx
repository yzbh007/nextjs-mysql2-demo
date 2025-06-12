"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

function Contact() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    // ✅ Logout Function
    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "GET" });

            // Remove client-side cookie
            Cookies.remove("user");

            // Redirect to login page
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white border-gray-200 shadow-md fixed top-0 w-full z-50">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <Link href="/home" className="flex items-center space-x-3">
                        <span className="text-2xl font-semibold">Petto</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 w-10 h-10 flex items-center justify-center text-gray-500 rounded-lg hover:bg-gray-100"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/home" className="text-blue-700">Home</Link>
                        <Link href="/" className="hover:text-blue-700">About</Link>
                        <Link href="/contact" className="hover:text-blue-700">Contact</Link>
                        <button
                            onClick={handleLogout}
                            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white shadow-md flex flex-col items-center p-4 space-y-4">
                        <Link href="/home" className="text-gray-900" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/" className="text-gray-900" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-gray-900" onClick={() => setMenuOpen(false)}>Contact</Link>
                        <button
                            onClick={handleLogout}
                            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            {/* Contact Information Section */}
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg mb-4">
                    Have questions? Reach out to us! We’d love to hear from you.
                </p>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg w-full">
                    <h2 className="text-2xl font-semibold mb-3">📍 Our Address</h2>
                    <p className="text-gray-700">
                        
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">📞 Phone</h2>
                    <p className="text-gray-700"><a href="tel:+819012345678">+81 90 1234 5678</a></p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">📧 Email</h2>
                    <p className="text-gray-700"><a href="mailto:XXXX@gmail.com">XXXX@gmail.com</a></p>
                </div>
            </div>
        </>
    );
}

export default withAuth(Contact);
