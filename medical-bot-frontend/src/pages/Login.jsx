import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, google } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    // load Google Identity Services script
    const existing = document.getElementById("gis-script");
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "gis-script";
      script.async = true;
      script.onload = () => {
        renderButton();
      };
      document.body.appendChild(script);
    } else {
      renderButton();
    }

    function renderButton() {
      if (!window.google || !googleButtonRef.current) return;
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          ux_mode: 'popup',
          context: 'signin',
          prompt_parent_id: 'g_id_onload',
        });
        // render a standard Google button
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      } catch (e) {
        console.error("GSI render error", e);
      }
    }
  }, [GOOGLE_CLIENT_ID]);

  async function handleCredentialResponse(response) {
    // response.credential is the ID token
    if (!response?.credential) return;
    setLoading(true);
    setErr("");
    try {
      console.log("Google response:", response);
      const user = await google(response.credential);
      console.log("Login successful, user data:", user);
      nav("/");
    } catch (e) {
      console.error("Google login error:", e);
      setErr(e?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        <div className="bg-blue-600 rounded-t-2xl p-6 md:p-8 flex items-center justify-center">
          <div className="flex items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.84-1.66C4.62 14.6 1 11.23 1 7.4c0-3.04 2.4-5.49 5.37-5.5h.13c1.7 0 3.33.83 4.3 2.22l.2.29.2-0.29c.97-1.39 2.6-2.22 4.3-2.22h.13c2.97.01 5.37 2.46 5.37 5.5 0 3.83-3.62 7.2-9.16 12.29L12 21.35z" />
            </svg>
            <span className="text-3xl font-bold">MedGuide AI</span>
          </div>
        </div>

        <div className="p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500 mb-6 md:mb-8">Your health conversations are private & secure.</p>

          {err && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
              <span className="block sm:inline">{err}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right mb-2">
              <Link to="#" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 max-w-sm mx-auto">
            {GOOGLE_CLIENT_ID ? (
              <div ref={googleButtonRef} />
            ) : null}
          </div>

          <p className="text-gray-500 text-sm mt-6">
            No account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
