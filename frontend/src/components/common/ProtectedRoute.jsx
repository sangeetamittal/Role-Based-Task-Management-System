import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// roles prop = ["Admin"] or ["Manager"] or ["User", "Admin"]
const ProtectedRoute = ({ children, roles }) => {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
