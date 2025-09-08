"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn’t answer.",
        },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Error: could not reach chat service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat popup */}
      {open && (
        <div className="w-80 h-[28rem] bg-white rounded-xl shadow-2xl flex flex-col border">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">AI Assistant</p>
                <p className="text-xs text-blue-100">Here to help</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-gray-200"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-gray-50">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center mt-16">
                👋 Hi! Ask me anything about this site.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white border p-2 rounded-lg w-fit text-gray-500">
                Typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 flex bg-white rounded-b-xl">
            <input
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
