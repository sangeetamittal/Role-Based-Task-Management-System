import React from 'react';
import './UserTable.css';

const UserTable = ({ users, tempRoles, onRoleChange, onSaveRole, onDelete, onCreateTask, currentUser }) => {
  // Define role colors with a neutral palette
  const roleColors = {
    'Admin': '#1b3ccdff',
    'Manager': '#2560c7ff',
    'User': '#5186e7ff'
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {currentUser.role === "Admin" && <th>Current Role</th>}
            {currentUser.role === "Admin" && <th>Update Role</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="username-cell">
                <div className="user-info-cell">
                  <div className="user-avatar-small">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                </div>
              </td>
              <td>{user.email}</td>
              
              {currentUser.role === "Admin" && (
                <>
                  <td>
                    <span 
                      className="role-badge" 
                      style={{ backgroundColor: roleColors[user.role] }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="role-update-controls">
                      <select
                        value={tempRoles[user._id]}
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
                  </td>
                </>
              )}
              
              <td>
                <div className="table-actions">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;