"use client";

import { Button } from "@nextui-org/react";
import { title } from "@/components/primitives";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { logOut } = useAuthStore(); // Zustand logOut function
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut(); // Call the Zustand logout function
      router.push("/"); // Navigate back to the main page
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-md bg-content1 p-6 rounded-lg shadow-lg">
        <h1 className={`${title()} text-center mb-6`}>Dashboard</h1>
        <Button
          color="danger"
          variant="flat"
          size="md"
          onClick={handleLogout}
          className="w-full"
        >
          Log Out
        </Button>
      </div>
    </section>
  );
}
