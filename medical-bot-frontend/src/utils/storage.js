const KEY = "mbot_chats_v1";

export function loadChats() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveChats(chats) {
  localStorage.setItem(KEY, JSON.stringify(chats));
}

export function upsertChat(chats, chat) {
  const idx = chats.findIndex((c) => c.id === chat.id);
  if (idx >= 0) {
    chats[idx] = chat;
  } else {
    chats.unshift(chat);
  }
  saveChats(chats);
  return [...chats];
}
