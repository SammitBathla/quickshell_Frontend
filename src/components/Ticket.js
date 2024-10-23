import React from 'react';
import './Ticket.css';

const Ticket = ({ ticket, grouping }) => {
  const { id, title, priority, tag, status } = ticket;

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return "/urgent-priority.svg";
      case 3:
        return "/high-priority.svg";
      case 2:
        return "/medium-priority.svg";
      case 1:
        return "/low-priority.svg";
      default:
        return "/no-priority.svg";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return '/To-do.svg'; 
      case 'In progress':
        return '/in-progress.svg'; 
      case 'Done':
        return '/Done.svg'; 
      case 'Canceled':
        return '/Cancelled.svg'; 
      case 'Backlog':
        return '/backlog.svg'; 
      default:
        return null;
    }
  };

  return (
    <div className="ticket">
      {/* ID and Avatar Inline */}
      <div className="ticket-id-avatar">
        <p>{id}</p>
        {/* Conditionally show image only when grouping is priority or status */}
        {(grouping === 'priority' || grouping === 'status') && (
          <img
            src={'/images.png'}  
            alt="User"
            className="user-icon"
            style={{ width: '20px', height: '20px', borderRadius: '50%', marginLeft: '10px' }}
          />
        )}
      </div>

      {/* Status Icon and Title */}
      <div className="ticket-status">
        <img
          src={getStatusIcon(status)}
          alt={status}
          className="status-icon"
          style={{ border: '1px lightgrey solid', borderRadius: '3px' }}
        />
        <h3>{title}</h3>
      </div>

      {/* Priority Icon and Tags */}
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={getPriorityIcon(priority)}
          alt={`Priority ${priority}`}
          className="priority-icon"
          style={{ border: '1px lightgrey solid', borderRadius: '3px' }}
        />
        <div style={{ margin: '8px', border: '1px lightgrey solid' }}>
          <img
            src={'/image.png'}  
            alt="User"
            className="user-icon"
            style={{ width: '14px' }}
          />
          <span >{tag.join(', ')}</span>
        </div>
      </p>
    </div>
  );
};

export default Ticket;
