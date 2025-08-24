import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = text.trim();
        if (!v) return;
        onSend(v);
        setText("");
      }}
      className="w-full"
    >
      <input
        className={`w-full bg-transparent border-none outline-none text-lg resize-none ${
          disabled 
            ? 'text-gray-400 placeholder-gray-300 cursor-not-allowed' 
            : 'text-gray-800 placeholder-gray-500'
        }`}
        placeholder="Ask a medical question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        style={{ minHeight: '24px' }}
      />
    </form>
  );
}
