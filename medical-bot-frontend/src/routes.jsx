import { createBrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminUpload from "./pages/AdminUpload";

export const router = createBrowserRouter([
  { path: "/", element: <Chat /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin/upload", element: <AdminUpload /> },
]);
