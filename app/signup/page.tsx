"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔹 Clean & trim password before sending
      const sanitizedData = {
        ...formData,
        password: formData.password.trim().replace(/\s+/g, "").slice(0, 72),
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        sanitizedData
      );

      localStorage.setItem("token", res.data.access_token);
      setMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => router.push("/chat"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Signup error:", err.response?.data);
        const errorMessage =
          typeof err.response?.data === "object"
            ? JSON.stringify(err.response?.data)
            : err.response?.data || "Try again.";
        setMessage("❌ Signup failed: " + errorMessage);
      } else {
        setMessage("❌ Something went wrong.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
