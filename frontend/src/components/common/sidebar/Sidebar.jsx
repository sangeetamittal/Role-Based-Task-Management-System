import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <Link 
          to="/tasks" 
          className={`menu-item ${isActive('/tasks') ? 'active' : ''}`}
          data-title="Tasks"
        >
          <span>Tasks</span>
        </Link>

        {role === "Admin" && (
          <Link 
            to="/users" 
            className={`menu-item ${isActive('/users') ? 'active' : ''}`}
            data-title="Manage Users"
          >
            <span>Manage Users</span>
          </Link>
        )}

        <Link 
          to="/calendar" 
          className={`menu-item ${isActive('/calendar') ? 'active' : ''}`}
          data-title="Calendar"
        >
          <span>Calendar</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;