import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </AuthProvider>
  );
}
