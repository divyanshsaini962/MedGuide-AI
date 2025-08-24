const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function http(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) {
    let err;
    try {
      err = await res.json();
    } catch (_) {
      /* noop */
    }
    throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  signup: (email, password) =>
    http("/api/auth/signup", { method: "POST", body: { email, password } }),
  login: (email, password) =>
    http("/api/auth/login", { method: "POST", body: { email, password } }),
  googleLogin: (idToken) =>
    http("/api/auth/google", { method: "POST", body: { idToken } }),
  me: () => http("/api/auth/me"),
  ask: (question, filter) =>
    http("/api/chat", { method: "POST", body: { question, filter } }),
  // admin
  status: () => http("/api/admin/status"),
  uploadPdf: async (file) => {
    const form = new FormData();
    form.append("pdf", file);
    const res = await fetch(`${API_BASE}/api/admin/upload-pdf`, {
      method: "POST",
      headers: { ...authHeader() },
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
};
