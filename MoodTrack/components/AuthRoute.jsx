"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import useAuthStore from "@/store/useAuthStore";

const publicRoutes = ["/auth/login", "/auth/register", "/", "/docs"];

export default function AuthRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // If user is authenticated and on a public route, redirect to dashboard
        if (publicRoutes.includes(pathname)) {
          router.push("/dashboard");
        }
      } else {
        setUser(null);

        // If user is unauthenticated and on a protected route, redirect to login
        if (!publicRoutes.includes(pathname)) {
          router.push("/auth/login");
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname, setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
