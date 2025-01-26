import { Navigate } from "react-router";
import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { currentUser } = useAuth();

  // if (!currentUser) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}
