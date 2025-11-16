import React from 'react';
import './TaskTable.css';

const TaskTable = ({ tasks, onEdit, onDelete, currentUser }) => {
  // Define status colors
  const statusColors = {
    'In Progress': '#ffc107',
    'Pending': '#17a2b8',
    'Completed': '#28a745',
    'Cancelled': '#dc3545'
  };

  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            {currentUser.role !== "User" && <th>Assigned To</th>}
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: statusColors[task.status] || '#6c757d' }}
                >
                  {task.status}
                </span>
              </td>
              {currentUser.role !== "User" && (
                <td>{task.assignedTo?.username || "N/A"}</td>
              )}
              <td>{task.createdBy?.username || "—"}</td>
              <td>
                <button className="btn btn-edit" onClick={() => onEdit(task._id)}>
                  Edit
                </button>
                {(currentUser.role === "Admin" || currentUser.role === "Manager") && (
                  <button className="btn btn-delete" onClick={() => onDelete(task._id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;