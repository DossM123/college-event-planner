import axios from "axios";
import React, { useState } from "react";

interface ReminderSettingsProps {
  userId: number;
  eventId: number;
  defaultTime: number;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ userId, eventId, defaultTime }) => {
  const [minutesBefore, setMinutesBefore] = useState(defaultTime);

  const handleSave = async () => {
    try {
      const formattedTime = `00:${String(minutesBefore).padStart(2, '0')}:00`; 

      await axios.post("http://localhost:3000/event/reminder", {
        userId,
        eventId,
        reminderTime: formattedTime,
      });

      alert("Reminder time saved.");
    } catch (err) {
      console.error("Error saving reminder:", err);
      alert("Failed to save reminder time.");
    }
  };

  return (
    <div className="reminder-settings">
      <label>Remind me:</label>
      <select value={minutesBefore} onChange={(e) => setMinutesBefore(Number(e.target.value))}>
        <option value={15}>15 minutes before</option>
        <option value={30}>30 minutes before</option>
        <option value={50}>50 minutes before</option>
      </select>
      <button onClick={handleSave}>Set Reminder</button>
    </div>
  );
};

export default ReminderSettings;
