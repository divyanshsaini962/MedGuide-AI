import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Topbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b bg-white flex items-center justify-between px-4 z-50 shadow-sm">
      <div className="font-semibold text-brand-700 text-lg">🩺 Medical Bot</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3">
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
              className="text-sm rounded border px-3 py-1 hover:bg-gray-50 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          {user && (
            <>
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name || user.email}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {user.name || user.email}
                  </div>
                  <div className="text-sm text-gray-500">User</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
