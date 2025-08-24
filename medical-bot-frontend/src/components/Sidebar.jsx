import { useChat } from "../context/ChatContext";
import { useState } from "react";

export default function Sidebar() {
  const { chats, activeId, setActiveId, newChat, renameChat, deleteChat } =
    useChat();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  return (
    <aside className="w-72 border-r bg-white flex flex-col">
      <div className="p-3">
        <button
          onClick={() => newChat()}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded px-3 py-2"
        >
          + New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-sm text-gray-500 px-3">No chats yet.</p>
        ) : (
          <ul>
            {chats.map((c) => (
              <li
                key={c.id}
                className={`group px-3 py-2 border-b cursor-pointer ${
                  activeId === c.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveId(c.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  {editingId === c.id ? (
                    <input
                      className="text-sm w-full border rounded px-2 py-1"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => {
                        renameChat(c.id, draft || c.title);
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          renameChat(c.id, draft || c.title);
                          setEditingId(null);
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                          setDraft(c.title);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm line-clamp-1">{c.title}</span>
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    <button
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(c.id);
                        setDraft(c.title);
                      }}
                      title="Rename"
                    >
                      ✏️
                    </button>
                    <button
                      className="text-xs text-gray-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(c.id);
                      }}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
