export default function Message({ message }) {
  return (
    <div
      className={`mb-2 ${
        message.sender === "user" ? "text-right" : "text-left"
      }`}
    >
      <span
        className={`inline-block px-3 py-2 rounded ${
          message.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {message.text}
      </span>
    </div>
  );
}