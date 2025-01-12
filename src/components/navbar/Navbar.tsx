"use client";
import Link from "next/link";
import FavoritesModal from "@/components/FavoritesModal";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white transition-all duration-300 ${
        isScrolled ? "bg-opacity-90 shadow-lg" : "bg-opacity-100"
      }`}
    >
      <Link href="/" className="text-3xl font-bold">
        Movie Search
      </Link>
      <FavoritesModal />
    </nav>
  );
}
