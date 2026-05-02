import { useState, useRef, useEffect } from "react";
import { getAIResponse } from "../../utils/ai";
import ReactMarkdown from "react-markdown";

export default function ChatBox({ chat, setChats }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const shouldAutoScroll = useRef(true);

  // Detect scroll position
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const atBottom =
      el.scrollHeight - el.scrollTop <= el.clientHeight + 50;

    shouldAutoScroll.current = atBottom;
    setShowScrollBtn(!atBottom);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (shouldAutoScroll.current) scrollToBottom();
  }, [chat.messages, loading]);

  //  Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { text: input, sender: "user" };

    // Rename chat from first message
    if (chat.title === "New Chat") {
      const newTitle = input.slice(0, 25);
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id ? { ...c, title: newTitle } : c
        )
      );
    }

    // Add user message
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id
          ? { ...c, messages: [...c.messages, userMsg] }
          : c
      )
    );

    setInput("");
    setLoading(true);

    try {
      const response = await getAIResponse(input);

      const botMsg = {
        text: response || "⚠️ No response received",
        sender: "bot",
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? { ...c, messages: [...c.messages, botMsg] }
            : c
        )
      );
    } catch (err) {
      const errorMsg = {
        text: "⚠️ Something went wrong. Try again.",
        sender: "bot",
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col h-full relative">

      {/* Chat Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth"
      >
        {chat.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-5 py-4 rounded-2xl max-w-xl backdrop-blur-lg shadow
              ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {msg.sender === "bot" ? (
                <div className="prose prose-invert max-w-none text-sm">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>

                  {/*  Copy */}
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(msg.text)
                    }
                    className="text-xs text-gray-400 hover:text-blue-400 mt-2"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="text-gray-400 animate-pulse">
            🤖 Thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/*  Scroll Down Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-6 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full shadow"
        >
          ↓
        </button>
      )}

      {/* ⚡ Suggestions */}
      <div className="flex gap-2 flex-wrap px-4 mb-2">
        {[
          "What is EVM?",
          "How to vote in India?",
          "What is voter ID?",
        ].map((q) => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="px-3 py-1 text-sm rounded-full
            bg-white/10 text-gray-300 hover:bg-white/20 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/*  Input */}
      <div className="px-4 pb-6">
        <div className="flex gap-2 bg-white/10 border border-white/20 rounded-xl p-2 backdrop-blur">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about elections..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-500"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}