"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import productData from "./productData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

function Home() {
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
                        {menuOpen ? <X color="#ff0000" size={24} /> : <Menu color="black" size={24} />}
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

            {/* Product Display Section */}
            <div className="min-h-screen pt-20 p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Our Dogs</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {productData.map((product) => (
                        // ✅ Moved key={product.id} to the outermost div inside map()
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            <Link href={`/product/${product.id}`} className="flex flex-col items-center">
                                <Image
                                    src={product.productImage}
                                    alt={product.productName}
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                />
                                <h2 className="text-xl font-semibold mt-4">{product.productName}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    
}

export default withAuth(Home);
