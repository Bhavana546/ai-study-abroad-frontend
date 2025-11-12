"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface ChatEntry {
  id: number;
  user: string;
  country: string;
  question: string;
  answer: string;
  model_used: string;
  timestamp: string;
}

export default function ChatHistoryPage() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get("`${process.env.NEXT_PUBLIC_API_URL}/chat/history");
        setHistory(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching chat history:", err.message);
          setError(`Failed to load chat history: ${err.message}`);
        } else {
          console.error("Unknown error fetching chat history:", err);
          setError("Failed to load chat history. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          📜 Chat History
        </h1>

        {loading && (
          <p className="text-center text-gray-600 animate-pulse">
            Loading chat history...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {!loading && !error && history.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No chat history available yet.
          </p>
        )}

        <div className="space-y-6 overflow-y-auto max-h-[70vh]">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>{new Date(entry.timestamp).toLocaleString()}</span>
                <span className="italic text-gray-400">
                  {entry.model_used}
                </span>
              </div>
              <p className="font-semibold text-gray-800">
                ❓ {entry.question}
              </p>
              <p className="mt-2 text-gray-700 whitespace-pre-line leading-relaxed">
                💬 {entry.answer}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                🌍 Country: <b>{entry.country}</b> | 👤 User:{" "}
                {entry.user || "Anonymous"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
