import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import Topbar from "../components/Topbar";
import { useChat } from "../context/ChatContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { activeChat, activeId, newChat, sendMessage, isLoading } = useChat();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) nav("/login");
    if (!activeId) newChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeId]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      {/* Top Navigation Bar - Fixed */}
      <Topbar />

      {/* Main Content Area - Adjusted for fixed Topbar */}
      <main className="flex-1 flex pt-14">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-16 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200 md:hidden"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar Navigation - Fixed */}
        <aside className={`fixed left-0 top-14 w-64 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}>
          <div className="p-4">
            {/* Mobile Close Button */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="text-lg font-semibold text-gray-900">MedGuide AI</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Desktop Title */}
            <div className="hidden md:block mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">MedGuide AI</h2>
              <p className="text-sm text-gray-600">Your medical assistant</p>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => {
                  newChat();
                  setIsMobileSidebarOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">New Chat</span>
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group">
                <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium">History</span>
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group">
                <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">Settings</span>
              </button>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-3">Recent Chats</div>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg truncate">
                  Heart health consultation
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg truncate">
                  Diabetes management
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg truncate">
                  Exercise recommendations
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Backdrop */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Welcome Section - ChatGPT Style */}
          {(!activeChat || activeChat.messages.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.84-1.66C4.62 14.6 1 11.23 1 7.4c0-3.04 2.4-5.49 5.37-5.5h.13c1.7 0 3.33.83 4.3 2.22l.2.29.2-0.29c.97-1.39 2.6-2.22 4.3-2.22h.13c2.97.01 5.37 2.46 5.37 5.5 0 3.83-3.62 7.2-9.16 12.29L12 21.35z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">MedGuide AI</h1>
              <p className="text-base md:text-lg text-gray-600 max-w-md px-4">
                Your personal medical assistant powered by AI
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-8 px-4">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Medical Consultation</h3>
                <p className="text-gray-600 text-xs md:text-sm">Get instant answers to your health questions</p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Evidence-Based</h3>
                <p className="text-gray-600 text-xs md:text-sm">Answers backed by medical literature and research</p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Private & Secure</h3>
                <p className="text-gray-600 text-xs md:text-sm">Your health conversations are confidential</p>
              </div>
            </div>

            {/* Quick Start Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 px-4">
              <button
                onClick={() => newChat()}
                className="px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start New Consultation
              </button>
              <button className="px-4 md:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                View History
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center max-w-2xl px-4">
              This AI assistant provides general health information and should not replace professional medical advice. 
              Always consult with a healthcare provider for medical decisions.
            </p>
          </div>
        ) : (
          /* Chat Messages Display */
          <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-6">
              {activeChat.messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">MedGuide AI is thinking...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Input - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-30">
          <div className="max-w-4xl mx-auto md:ml-64">
            <div className="relative">
              <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl px-4 md:px-6 py-3 md:py-4 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl">
                <button 
                  disabled={isLoading}
                  className={`mr-3 md:mr-4 p-2 rounded-xl transition-all duration-200 ${
                    isLoading 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="flex-1">
                  <ChatInput onSend={(t) => sendMessage(t)} disabled={isLoading} />
                </div>
                <button 
                  disabled={isLoading}
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Ask a medical question..."]');
                    if (input && input.value.trim()) {
                      sendMessage(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className={`ml-3 md:ml-4 p-2 rounded-xl transition-all duration-200 ${
                    isLoading 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
       </div>
     </main>
    </div>
  );
}
