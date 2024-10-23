import React from 'react';
import './Ticket.css';

const Ticket = ({ ticket }) => {
  const { id, title, priority, tag, status } = ticket; // Make sure 'status' is part of ticket

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

  const priorityColor = (priority) => {
    switch (priority) {
      case 4:
        return 'red';
      case 3:
        return 'orange';
      case 2:
        return 'yellow';
      case 1:
        return 'green';
      default:
        return 'gray';
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
      <p>{id}</p>

      {/* Status Icon and Text */}
      <div className="ticket-status">
        <img
          src={getStatusIcon(status)}
          alt={status}
          className="status-icon"
          style={{ border: '1px lightgrey solid', borderRadius: '3px' }}
        />
        <span className="status-text" style={{ marginLeft: '8px' }}>{status}</span>
      </div>

      <h3>{title}</h3>

      {/* Display priority icon and user image */}
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={getPriorityIcon(priority)}
          alt={`Priority ${priority}`}
          className="priority-icon"
          style={{ border: '1px lightgrey solid', borderRadius: '3px' }}
        />

        {/* Assuming `tag[0]` contains the user image */}
        <div style={{ margin: '8px', border: '1px lightgrey solid' }}>
          <img
            src={'/image.png'}  // You may replace this with actual user image source
            alt="User"
            className="user-icon"
            style={{ marginLeft: '8px', width: '15px' }}
          />
          <span style={{ marginLeft: '8px' }}>{tag.join(', ')}</span>
        </div>
      </p>
    </div>
  );
};

export default Ticket;
