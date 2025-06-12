"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import productData from "../home/productData";
import withAuth from "@/utils/withAuth";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get("id");

    const product = productData.find((p) => p.id.toString() === productId);

    const [buttonText, setButtonText] = useState("Confirm Purchase");
    const [isDisabled, setIsDisabled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    if (!product) {
        return <h1 className="text-center text-2xl mt-10">Product not found</h1>;
    }

    const handlePurchase = async () => {
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productName: product.productName,
                    productPrice: product.productPrice,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setButtonText("Order Placed! ✅");
                setIsDisabled(true);
                alert("Order confirmed! A confirmation email has been sent.");
            } else {
                alert(`Failed to place order: ${data.message}`);
            }
        } catch (error) {
            console.error("Order error:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "GET" });

            Cookies.remove("user");
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
                    <Link href="/home" className="flex items-center space-x-3">
                        <span className="text-2xl font-semibold">Petto</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 w-10 h-10 flex items-center justify-center text-gray-500 rounded-lg hover:bg-gray-100"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-white shadow-md flex flex-col items-center p-4 space-y-4">
                        <Link href="/home" className="text-gray-900" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/" className="text-gray-900" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-gray-900" onClick={() => setMenuOpen(false)}>Contact</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            {/* Checkout Section */}
            <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-24">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <p className="text-lg">You are purchasing: <strong>{product.productName}</strong></p>
                <p className="text-lg">Price: <strong>{product.productPrice}</strong></p>
                <button
                    onClick={handlePurchase}
                    disabled={isDisabled}
                    className={`mt-6 px-6 py-3 text-white text-lg font-medium rounded-lg transition ${isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {buttonText}
                </button>
            </div>
        </>
    );
}

function Checkout() {
    return (
        <Suspense fallback={<h1 className="text-center text-2xl mt-10">Loading...</h1>}>
            <CheckoutContent />
        </Suspense>
    );
}

export default withAuth(Checkout);
