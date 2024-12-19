"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/navbar";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Routes where the Navbar should not be displayed
  const hideNavbarOnRoutes = [""];

  return (
    <div className="relative flex flex-col h-screen">
      {/* Conditionally Render Navbar */}
      {!hideNavbarOnRoutes.includes(pathname) && <Navbar />}
      {children}
    </div>
  );
}
