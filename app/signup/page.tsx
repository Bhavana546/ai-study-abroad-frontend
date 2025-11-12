"use client";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/signup", formData);
console.log(res.data);

      setMessage("✅ Signup successful!");
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setMessage("❌ Signup failed: " + (err.response?.data?.detail || "Try again."));
  } else {
    setMessage("❌ Something went wrong.");
  }
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br
 from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>
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
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
