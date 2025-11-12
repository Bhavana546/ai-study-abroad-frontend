"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // ✅ Handle send
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/ask`,
        { question, country: "USA" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer },
      ]);
    } catch (err: unknown) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error fetching AI response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center p-6">
      {/* 🌐 Navbar */}
      <nav className="w-full max-w-3xl bg-blue-600 text-white rounded-t-xl shadow-md px-6 py-3 flex justify-between items-center">
        <span className="font-semibold text-lg">🎓 Study Abroad AI</span>
        <div className="flex gap-4 items-center">
          <a
            href="/history"
            className="bg-white/20 px-3 py-1.5 rounded-md hover:bg-white/30 transition"
          >
            📜 History
          </a>
          <button
            onClick={handleLogout}
            className="bg-white/20 px-3 py-1.5 rounded-md hover:bg-white/30 transition"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* 💬 Chat Window */}
      <div className="bg-white w-full max-w-3xl rounded-b-xl shadow-lg p-6 flex flex-col mt-0">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Study Abroad AI Assistant
        </h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 h-[400px] bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <p className="text-center text-sm text-gray-500 animate-pulse">
              🤖 AI is thinking...
            </p>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about studying abroad..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
