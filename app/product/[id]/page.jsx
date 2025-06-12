"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import productData from "../../home/productData";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import withAuth from "@/utils/withAuth";

function Product() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { id } = useParams();
    const product = productData.find((p) => p.id === parseInt(id));

    if (!product) return <h1 className="text-center mt-20 text-2xl">Product Not Found</h1>;

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

    const handleBuy = () => {
        router.push(`/checkout?id=${product.id}`);
    };

    return (
        <>
            {/* Navbar */}
            < nav className="bg-white border-gray-200 shadow-md fixed top-0 w-full z-50" >
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
                {
                    menuOpen && (
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
                    )
                }
            </nav >
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                    <div className="flex justify-center">
                        <Image src={product.productImage} alt={product.productName} width={300} height={300} className="rounded-lg" />
                    </div>

                    <div className="text-center mt-6">
                        <h1 className="text-3xl font-bold">{product.productName}</h1>
                        <p className="text-lg text-gray-600 mt-2">{product.productDesc}</p>
                        <p className="text-2xl font-semibold text-blue-600 mt-4">{product.productPrice}</p>

                        <button
                            onClick={handleBuy}
                            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(Product);
