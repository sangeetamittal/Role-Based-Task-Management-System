import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, currentUser }) => {
  // Define status colors
  const statusColors = {
    'Pending': '#27cec0ff',
    'In Progress': '#ffc107',
    'Completed': '#28a745'
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span 
          className="task-status" 
          style={{ backgroundColor: statusColors[task.status] || '#6c757d' }}
        >
          {task.status}
        </span>
      </div>
      
      <div className="task-details">
        {currentUser.role !== "User" && (
          <div className="task-detail">
            <span className="detail-label">Assigned To:</span>
            <span className="detail-value">{task.assignedTo?.username || "N/A"}</span>
          </div>
        )}
        <div className="task-detail">
          <span className="detail-label">Created By:</span>
          <span className="detail-value">{task.createdBy?.username || "—"}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task._id)}>
          Edit
        </button>
        {(currentUser.role === "Admin" || currentUser.role === "Manager") && (
          <button className="btn btn-delete" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;