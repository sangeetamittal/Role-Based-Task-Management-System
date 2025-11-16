import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <span  className="navbar-brand">Task Manager</span>
      
      <div className="navbar-user">
        {user && (
          <div className="user-info">
            <span className="username">{user.username}</span>
            <span className="user-role">{user.role}</span>
          </div>
        )}
        <button 
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;