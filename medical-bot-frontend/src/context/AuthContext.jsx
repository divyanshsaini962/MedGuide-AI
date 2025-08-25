import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      api.me()
        .then((res) => {
          if (res && res.user) {
            localStorage.setItem("user", JSON.stringify(res.user));
            setUser(res.user);
          }
        })
        .catch(() => {
          // ignore
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setSession({ token, user }) {
    if (token) localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      setSession,
      logout,
      async login(email, password) {
        const res = await api.login(email, password);
        setSession(res);
        return res.user;
      },
      async signup(email, password) {
        const res = await api.signup(email, password);
        setSession(res);
        return res.user;
      },
      async google(idToken) {
        const res = await api.googleLogin(idToken);
        if (res.user && res.token) {
          // Ensure we have the complete user profile
          setSession({
            token: res.token,
            user: {
              ...res.user,
              name: res.user.name || res.user.email.split('@')[0],
              picture: res.user.picture || null
            }
          });
          return res.user;
        }
        throw new Error('Invalid response from Google login');
      },
      async refresh() {
        const res = await api.me();
        if (res?.user) {
          setSession(res);
          return res.user;
        }
        return null;
      },
    }),
    [user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
