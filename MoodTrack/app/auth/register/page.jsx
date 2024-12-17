"use client";

import { Input, Button, Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { title } from "@/components/primitives";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, error } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password);
      router.push("/auth/login"); // Navigate to login page after successful registration
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-md">
        <Card className="bg-content1 p-6 rounded-lg shadow-lg">
          <CardHeader className="flex flex-col items-center gap-2">
            <h1 className={`${title()} text-center text-3xl`}>Register</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleRegister}>
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Spacer y={2} />
              <Input
                isRequired
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <Spacer y={2} />
              <Input
                isRequired
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-4"
              />
              <Spacer y={4} />
              <Button color="primary" type="submit" className="w-full">
                Register
              </Button>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
            <div className="mt-6 text-center text-white">
              <Snippet hideCopyButton hideSymbol variant="bordered">
                <span>
                  Already have an account?{" "}
                  <Link href="/auth/login" color="primary">
                    <Code color="primary">Login here</Code>
                  </Link>
                </span>
              </Snippet>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
