import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userJson) {
    const user = JSON.parse(userJson);
    if (!allowedRoles.includes(user.role)) {
      // If user is logged in but doesn't have the right role, redirect to home or dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

