import React from 'react';
import './UserCard.css';

const UserCard = ({ user, tempRole, onRoleChange, onSaveRole, onDelete, onCreateTask, currentUser }) => {
  // Define role colors with a neutral palette
  const roleColors = {
    'Admin': '#0b1dbfff',
    'Manager': '#0d60a8ff',
    'User': '#478ed4ff'
  };

  return (
    <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.username}</h3>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      
      {currentUser.role === "Admin" && (
        <div className="user-role-section">
          <div className="current-role">
            <span className="role-label">Current Role:</span>
            <span 
              className="role-badge" 
              style={{ backgroundColor: roleColors[user.role] }}
            >
              {user.role}
            </span>
          </div>
          
          <div className="update-role">
            <span className="role-label">Update Role:</span>
            <div className="role-controls">
              <select
                value={tempRole}
                onChange={(e) => onRoleChange(user._id, e.target.value)}
                className="role-select"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <button 
                className="btn-save-role"
                onClick={() => onSaveRole(user._id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="user-actions">
        <button 
          className="btn-create-task"
          onClick={() => onCreateTask(user._id)}
        >
          Create Task
        </button>
        
        {currentUser.role === "Admin" && currentUser.id !== user._id && (
          <button 
            className="btn-delete-user"
            onClick={() => onDelete(user._id)}
          >
            Delete User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;