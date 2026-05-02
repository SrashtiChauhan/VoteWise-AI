import { useState, useEffect } from "react";
import ChatBox from "../components/Chat/ChatBox";
import Sidebar from "../components/Chat/Sidebar";

export default function ChatPage() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentId, setCurrentId] = useState(null);

  // 💾 Save chats
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // ➕ New chat
  const newChat = () => {
    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [
        {
          text: "👋 Ask me about elections, EVM, voting 🇮🇳",
          sender: "bot",
        },
      ],
    };

    setChats((prev) => [chat, ...prev]);
    setCurrentId(chat.id);
  };

  // ❌ Delete chat
  const deleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (currentId === id) setCurrentId(null);
  };

  const currentChat = chats.find((c) => c.id === currentId);

  return (
  <div className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">

    <div className="flex h-[80vh] rounded-xl overflow-hidden border 
    bg-white dark:bg-[#0f172a]">

      <Sidebar
        chats={chats}
        currentId={currentId}
        setCurrentId={setCurrentId}
        newChat={newChat}
        deleteChat={deleteChat}
      />

      <div className="flex-1 flex items-center justify-center">
        {currentChat ? (
          <ChatBox
            chat={currentChat}
            setChats={setChats}
            chats={chats}
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            Select or start a chat
          </div>
        )}
      </div>

    </div>
  </div>
);
}