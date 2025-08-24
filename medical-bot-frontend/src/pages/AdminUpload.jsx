import { useState } from "react";
import { api } from "../services/api";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Upload PDF to (re)index</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setMsg("");
          if (!file) return;
          try {
            const res = await api.uploadPdf(file);
            setMsg(`Uploaded ${res.file}. Indexing triggered.`);
          } catch (e) {
            setMsg(e.message);
          }
        }}
        className="space-y-3"
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="bg-gray-800 text-white rounded px-3 py-2">
          Upload
        </button>
      </form>
      {msg && <div className="text-sm text-gray-600 mt-3">{msg}</div>}
    </div>
  );
}
