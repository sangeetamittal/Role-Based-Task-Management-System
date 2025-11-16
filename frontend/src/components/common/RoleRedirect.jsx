import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RoleRedirect = () => {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) return <Navigate to="/login" />;

  if (user.role === "Admin") return <Navigate to="/admin/dashboard" />;
  if (user.role === "Manager") return <Navigate to="/manager/dashboard" />;
  if (user.role === "User") return <Navigate to="/user/dashboard" />;

  return <Navigate to="/login" />;
};

export default RoleRedirect;