import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        {err && <div className="text-sm text-red-600">{err}</div>}
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr("");
            try {
              await signup(email, password);
              nav("/");
            } catch (e) {
              setErr(e.message);
            }
          }}
        >
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Password (min 6)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded px-3 py-2">
            Sign up
          </button>
        </form>
        <p className="text-sm text-gray-600">
          Have an account?{" "}
          <Link className="text-brand-600" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
