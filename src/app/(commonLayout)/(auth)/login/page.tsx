"use client";
import Link from "next/link";
import Image from "next/image";
import authImg from "../../../../assets/authenticationImg.png";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z.string().trim().min(6, "Minimum 6 characters for Password."),
});

type SignInData = z.infer<typeof signInSchema>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signInSchema.safeParse({
      email,
      password,
    });

    const userInfo: SignInData = {
      email,
      password,
    };

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        userInfo,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen">
      <div className="bg-white w-7/12 mx-auto my-20 rounded-2xl h-110 p-5 px-8 shadow-2xl">
        <h2 className="text-[#1F2937] text-3xl font-bold">Sign In</h2>
        <div className="flex justify-between items-center">
          <form onSubmit={handleSignIn} className="flex flex-col">
            {/* Email */}
            <label className="mt-3">Email:</label>
            <input
              className="border-1 rounded-xl p-1 w-80"
              type="email"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <label className="mt-3">Password:</label>
            <input
              className="border-1 rounded-xl p-1 w-80"
              type="password"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="bg-[#111827] text-white font-semibold text-center w-40 mt-3 rounded-xl py-1 mx-auto hover:cursor-pointer"
            >
              Sign In
            </button>
            <p className="text-center my-2">
              New User?{" "}
              <Link
                className="hover:cursor-pointer hover:underline"
                href="/signup"
              >
                Register
              </Link>{" "}
            </p>
          </form>
          <Image className="w-80 h-80" src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
}
