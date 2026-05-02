export default function Sidebar({
  chats,
  currentId,
  setCurrentId,
  newChat,
  deleteChat,
}) {
  return (
    <div className="w-64 h-full p-4 
    bg-gray-100 dark:bg-[#020617]
    border-r border-white/10">

      <button
        onClick={newChat}
        className="w-full mb-4 py-2 rounded-lg 
        bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
      >
        + New Chat
      </button>

      <div className="space-y-2 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex justify-between items-center p-2 rounded cursor-pointer text-sm transition
            ${
              currentId === chat.id
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            <span
              onClick={() => setCurrentId(chat.id)}
              className="truncate"
            >
              {chat.title}
            </span>

            <button
              onClick={() => deleteChat(chat.id)}
              className="text-red-400 hover:text-red-600 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}