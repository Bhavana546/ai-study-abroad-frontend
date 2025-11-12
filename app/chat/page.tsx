"use client";
import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", content: question };
    setMessages([...messages, newMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/chat/ask",
        { question, country: "USA" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.answer }]);
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          🎓 Study Abroad AI Assistant
        </h1>

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
        
<div className="text-center mt-6">
  <a
    href="/history"
    className="inline-block bg-linear-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
  >
    📜 View Chat History
  </a>
</div>
      </div>
    </div>
  );
}


