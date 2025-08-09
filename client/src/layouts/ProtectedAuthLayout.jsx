import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedAuthLayout() {
  const { user } = useAuth();

  if (user) {
    // If logged in, redirect away from login/register pages
    return <Navigate to="/" replace />;
  }

  // If not logged in, render the requested route
  return <Outlet />;
}
