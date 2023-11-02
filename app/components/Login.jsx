"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid,Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Enter the Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {error}error
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account?<span className="underLine"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
