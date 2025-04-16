import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../styles/Reminder.css";

interface Reminder {
  event_id: number;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  reminder_time: string;
}

const API_URL = "http://localhost:3000";

const Reminder: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertedReminders, setAlertedReminders] = useState<Set<number>>(new Set());
  const userId = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchReminders = async () => {
      if (!userId || isNaN(userId)) {
        setError("Invalid user ID. Please log in again.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/event/reminder/${userId}`);
        setReminders(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch reminders:", err);
        setError(err.response?.data?.message || "Failed to load reminders.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, [userId]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      reminders.forEach((reminder) => {
        if (alertedReminders.has(reminder.event_id)) return;

        const [year, month, day] = reminder.event_date.split("-").map(Number);
        const [hours, minutes, seconds] = reminder.event_time.split(":").map(Number);
        const eventDateTime = new Date(year, month - 1, day, hours, minutes, seconds);

        const [remHours, remMinutes, remSeconds] = reminder.reminder_time.split(":").map(Number);
        const reminderMs = (remHours * 3600 + remMinutes * 60 + remSeconds) * 1000;

        const triggerTime = new Date(eventDateTime.getTime() - reminderMs);
        if (
          now >= triggerTime &&
          now <= new Date(triggerTime.getTime() + 60 * 1000)
        ) {
          alert(
            `Reminder: ${reminder.title} is starting in ${remMinutes} minutes at ${reminder.event_time} at ${reminder.location}!`
          );
          setAlertedReminders((prev) => new Set(prev).add(reminder.event_id));
        }
      });
    };
    const intervalId = setInterval(checkReminders, 60 * 1000);
    checkReminders();

    return () => clearInterval(intervalId);
  }, [reminders, alertedReminders]);

  return (
    <div className="reminder-container">
      <Header />
      <Sidebar />
      <div className="reminder-content">
        <h2>My Event Reminders</h2>

        {isLoading && <p>Loading reminders...</p>}
        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && reminders.length === 0 ? (
          <p className="no-reminders">
            No reminders set. <a href="/set-reminder">Add a reminder</a>.
          </p>
        ) : (
          <ul className="reminder-list" role="list">
            {reminders.map((reminder) => (
              <li key={reminder.event_id} className="reminder-card" role="listitem">
                <h3>{reminder.title}</h3>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(reminder.event_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <strong>Time:</strong> {reminder.event_time}
                </p>
                <p>
                  <strong>Location:</strong> {reminder.location}
                </p>
                <p>
                  <strong>Remind Me:</strong> {reminder.reminder_time} before event
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reminder;
