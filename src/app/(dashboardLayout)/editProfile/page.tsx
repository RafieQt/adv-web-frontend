"use client";
import { Navbar } from "@/components/layout/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const editSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  fullname: z.string().trim().min(3, "Full name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type User = {
  id: string;
  email: string;
  username: string;
  fullname: string;
};


export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        router.push("/login"); 
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = editSchema.safeParse({
      username,
      fullname,
      password,
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const updatedUserInfo = {
      username,
      fullname,
      password,
    }
    
    try{
      const res = await axios.patch(`http://localhost:4000/customer/partial-update/${user?.id}`, updatedUserInfo, {
        withCredentials: true,
      });
      console.log(res);
      router.push("/dashboard");
    }catch(err){
      console.log(err);
    }

  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-90 bg-white shadow-2xl rounded-2xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold text-[#1F2937] mb-4">Edit Profile</h1>
      <form onSubmit={handleEdit} className="flex flex-col">
        {/* Username */}
        <label className="mt-3">Username:</label>
        <input
          className="border-1 rounded-xl p-1 w-80"
          type="text"
          placeholder="Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Full Name */}
        <label className="mt-3">Full Name:</label>
        <input
          className="border-1 rounded-xl p-1 w-80"
          type="text"
          placeholder="Your Full Name"
          onChange={(e) => setFullname(e.target.value)}
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
          className="bg-[#111827] text-white font-semibold text-center w-40 mt-3 rounded-xl py-1 mx-auto"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
