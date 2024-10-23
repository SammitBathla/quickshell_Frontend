import React from 'react';
import Ticket from './Ticket';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return { icon: '/urgent-priority.svg', name: 'Urgent' };
      case 3:
        return { icon: '/high-priority.svg', name: 'High' };
      case 2:
        return { icon: '/medium-priority.svg', name: 'Medium' };
      case 1:
        return { icon: '/low-priority.svg', name: 'Low' };
      case 0:
        return { icon: '/no-priority.svg', name: 'No Priority' };
      default:
        return { icon: null, name: 'Unknown Priority' };
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

  const getUserAvatar = (userName) => {
    const user = users.find((u) => u.name === userName); 
    return user && user.avatar ? user.avatar : '/images.png';
  };

  const groupTickets = (tickets) => {
    if (grouping === 'status') {
      const grouped = groupBy(tickets, 'status');
      
      grouped['Done'] = grouped['Done'] || [];
      grouped['Canceled'] = grouped['Canceled'] || [];
      
      return grouped;
    } else if (grouping === 'user') {
      return groupByUser(tickets, users);
    } else if (grouping === 'priority') {
      return groupBy(tickets, 'priority');
    }
  };

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const groupByUser = (tickets, users) => {
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    return tickets.reduce((result, ticket) => {
      const user = userMap[ticket.userId];
      const userName = user ? user.name : 'Unknown User';
      (result[userName] = result[userName] || []).push(ticket);
      return result;
    }, {});
  };

  const sortTickets = (tickets) => {
    if (sorting === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sorting === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          <div className="kanban-column-header">
            <div className="kanban-header-content">
              {grouping === 'priority' && (
                <>
                  <img 
                    src={getPriorityIcon(Number(groupKey)).icon} 
                    alt={getPriorityIcon(Number(groupKey)).name} 
                    className="status-icon" 
                  />
                  <span className="status-text">
                    {getPriorityIcon(Number(groupKey)).name}
                  </span>
                </>
              )}
              
              {grouping === 'status' && (
                <>
                  <img 
                    src={getStatusIcon(groupKey)} 
                    alt={groupKey} 
                    className="status-icon" 
                  />
                  <span className="status-text">{groupKey}</span>
                </>
              )}

              {grouping === 'user' && (
                <div className="kanban-user-header">
                  <img 
                    src={getUserAvatar(groupKey)} 
                    alt={groupKey} 
                    className="user-avatar-icon" 
                  />
                  <span className="status-text">{groupKey}</span>
                </div>
              )}
            </div>
            <div className="kanban-icons">
              <img src="/add.svg" alt="Add" className="icon plus-icon" />
              <img src="/three-dots.svg" alt="Options" className="icon options-icon" />
            </div>
          </div>
          <div className="kanban-column-body">
            {sortTickets(groupedTickets[groupKey]).map((ticket) => (  
              <Ticket key={ticket.id} ticket={ticket} grouping={grouping} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
