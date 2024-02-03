import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <div className="flex flex-1 overflow-hidden">
            <div className="h-full">
            </div>
            <div className="bg-white w-full overflow-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
