export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap
        ${isUser ? "bg-brand-600 text-white" : "bg-white border"}`}
      >
        {content}
      </div>
    </div>
  );
}
