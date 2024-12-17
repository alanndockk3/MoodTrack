"use client";

import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes where the Navbar should not be displayed
  const hideNavbarOnRoutes = ["/dashboard"];

  return (
    <div className="relative flex flex-col h-screen">
      {/* Conditionally Render Navbar */}
      {!hideNavbarOnRoutes.includes(pathname) && <Navbar />}
      {children}
    </div>
  );
}
