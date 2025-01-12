import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MovieProvider } from "@/contexts/MovieContext";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Search for your favorite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <MovieProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 pt-24">{children}</main>
        </MovieProvider>
      </body>
    </html>
  );
}
