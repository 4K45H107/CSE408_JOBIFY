"use client";

import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { AuthContext } from "@/contexts/AuthContext";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  const { isLoggedIn, role } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    if (role === "employer") router.push("/employer/home");
  }, [isLoggedIn, router]);

  return (
    <div className="h-screen flex flex-col">
      <div className="header">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full">
          <Navbar />
        </div>
        <div className="bg-white w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
