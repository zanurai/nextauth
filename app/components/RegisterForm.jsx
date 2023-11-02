"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log("Name:", name);
  // console.log("email:", email);
  // console.log("password:", password);

  const handleSubmit = async (e) => {
    e.preventDefault(); //yesle page refresh garauna bata rokxa
    if (!name || !email || !password) {
      setError("all fields are necessary");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        console.log("form", form);
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("error during registration", error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          ></input>
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
          {/* <input
            onChange={(e) => setName(e.target.value)}
            type="password"
            placeholder="Confirm-Password"
          ></input> */}
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account ?
            <span className="underLine"> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
