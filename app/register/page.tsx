"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        setError("Registration failed");
        return;
      }
      router.push("/");
    } catch (error) {
      setError(`Error during registration: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="card bg-gray-100 w-96 border-2 dark:border-none dark:bg-inherit shadow-2xl">
        <div className="card-body items-center text-center gap-7">
          <h2 className="card-title">Signup</h2>
          <input
            type="text"
            placeholder="John doe"
            className="input input-lg shadow-xl border-none text-black dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="John@email.com"
            className="input input-lg shadow-xl border-none text-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-lg shadow-xl border-none text-black dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions flex items-center justify-center gap-10"></div>
          <button
            className="btn btn-primary text-lg w-full"
            onClick={handleSubmit}
          >
            Signup
          </button>
          <p className="text-lg ">
            Already have an account{" "}
            <b>
              <Link className="text-blue-600" href={"/login"}>
                Login
              </Link>
            </b>
          </p>

          {error && (
            <div role="alert" className="alert alert-error w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
