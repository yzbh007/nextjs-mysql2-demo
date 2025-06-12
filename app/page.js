"use client";

import Image from "next/image";
import DoggyImage from "../public/doggy-hero.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import Cookies to check login status

export default function About() {
  const router = useRouter();

  const handleLoginClick = () => {
    const user = Cookies.get("user"); // Check if user is logged in
    if (user) {
      router.push("/home"); // Redirect to home if logged in
    } else {
      router.push("/login"); // Otherwise, go to login
    }
  };

  return (
    <div className="flex flex-col h-screen px-4">
      {/* Login Button */}
      <div className="flex">
        <button
          className="bg-none text-3xl sm:text-4xl font-normal ml-4"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row justify-center items-center h-full text-center">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={DoggyImage}
            alt="doggy hero"
            className="max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
          />
        </div>

        {/* Title */}
        <div className="w-full md:w-1/2">
          <h1 className="font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            Petto
          </h1>
        </div>
      </div>
    </div>
  );
}
