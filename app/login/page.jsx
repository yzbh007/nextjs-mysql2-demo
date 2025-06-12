"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", place: "", state: "", country: "", phone: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Account created successfully!");
                setIsSignup(false);
            } else {
                setError(data.error);
            }
        } else {
            const res = await fetch("/api/users");
            const users = await res.json();
            const user = users.find((u) => u.email === formData.email);

            if (user) {
                const passwordCheck = await fetch("/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });

                const authResponse = await passwordCheck.json();
                if (passwordCheck.ok) {
                    Cookies.set("user", formData.email, { expires: 7 });
                    router.push("/home");
                } else {
                    setError(authResponse.error);
                }
            } else {
                setError("Invalid email or password.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-5xl font-bold mb-8">Petto</h1>

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {isSignup && (
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="input-style" />
                    )}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input-style" />

                    {isSignup && (
                        <>
                            <input type="text" name="place" placeholder="Place" value={formData.place} onChange={handleChange} required className="input-style" />
                            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="input-style" />
                            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="input-style" />
                            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="input-style" />
                        </>
                    )}

                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="input-style" />

                    {isSignup && (
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="input-style" />
                    )}

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition text-lg font-semibold">
                        {isSignup ? "Create Account" : "Login"}
                    </button>
                </form>

                {/* Toggle Signup/Login */}
                <p className="text-center mt-4 text-gray-600">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 hover:underline font-medium">
                        {isSignup ? "Login" : "Create New Account"}
                    </button>
                </p>
            </div>

            {/* Tailwind Styles for Input Fields */}
            <style jsx>{`
                .input-style {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    outline: none;
                    font-size: 16px;
                    transition: border 0.2s ease-in-out;
                }
                .input-style:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
                }
            `}</style>
        </div>
    );
}
