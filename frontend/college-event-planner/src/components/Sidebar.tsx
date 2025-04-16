import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/sidebar.css';

const Sidebar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('user_role');
    setRole(storedRole);
  }, []);

  if (!role) return <div>Loading...</div>;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleReminderClick = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3000/event/reminder/${userId}`);
      localStorage.setItem("reminders", JSON.stringify(response.data));
      setIsOpen(false);
      navigate('/event/reminder');
    } catch (err) {
      console.error("Failed to fetch reminders:", err);
    }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {role === 'Participant' ? (
            <>
              <li>
                <Link to="/events" onClick={() => setIsOpen(false)}>Event List</Link>
              </li>
              <li>
                <Link to="/myevents" onClick={() => setIsOpen(false)}>My Events</Link>
              </li>
              <li>
                <button onClick={handleReminderClick} className="sidebar-btn">Reminders</button>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/events" onClick={() => setIsOpen(false)}>Event List</Link>
              </li>
              <li>
                <Link to="/addevent" onClick={() => setIsOpen(false)}>Add Event</Link>
              </li>
              <li>
                <Link to="/myevents" onClick={() => setIsOpen(false)}>My Events</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
