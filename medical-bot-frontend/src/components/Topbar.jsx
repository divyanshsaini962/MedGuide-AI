import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="font-semibold text-brand-700">🩺 Medical Bot</div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="flex items-center gap-2">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || user.email}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-sm text-gray-600">
                {user.name || user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm rounded border px-3 py-1 hover:bg-gray-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
