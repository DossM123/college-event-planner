import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'
import axios from 'axios';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleReminderClick = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3000/event/reminder/${userId}`);
      localStorage.setItem("reminders", JSON.stringify(response.data));
      navigate('/event/reminder');
    } catch (err) {
      console.error("Failed to fetch reminders:", err);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>Engineering College</h2>
      </div>
      <div className="header-right">
        {/* <Link to={`/${role}/profile`}>Profile</Link> */}
        <button onClick={handleReminderClick} className="header-btn">Reminders</button>
      </div>
    </header>
  );
};

export default Header;