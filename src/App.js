import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    // Fetch data from API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
        console.log(data);

      })
      .catch(error => console.log('Error fetching data:', error));

  }, []);

  return (
    <div className="App">
      <header>
        <div className="display-dropdown">
          <div className="dropdown-container">
            <img src='/Display.svg' />
            Display
            <img src='/down.svg' />
            <div className="dropdown-content">
              <div className="grouping">
                <label htmlFor="grouping">Grouping</label>
                <select id="grouping" value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="ordering">
                <label htmlFor="sorting">Ordering</label>
                <select id="sorting" value={sorting} onChange={(e) => setSorting(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;
