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
    <header className="fixed top-0 left-0 right-0 h-14 border-b bg-white flex items-center justify-between px-4 z-20 shadow-sm">
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
              <div className="text-sm font-semibold text-gray-800">
                {user.name || user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm rounded-lg border border-gray-300 px-4 py-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
