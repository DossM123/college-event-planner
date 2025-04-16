import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../../styles/MyEvents.css';
import ReminderSettings from './ReminderSetting';

interface Event {
  event_id: number;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  description: string;
}

interface MyEventsProps {
  userId: number;
}

const MyEvents: React.FC<MyEventsProps> = ({ userId }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchMyEvents = async () => {
    try {
      const response = await fetch(`http://localhost:3000/event/my-events/${userId}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [userId]);

  const handleCancel = async (eventId: number) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel your registration?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:3000/event/unregister/${userId}/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Registration cancelled.");

        setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));

        fetchMyEvents();
      } else {
        alert("Failed to cancel registration.");
      }
    } catch (error) {
      console.error("Error cancelling registration:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <div className="my-events-container">
      <div className="header">
          <Header />
      </div>
      <Sidebar />
      <h2>My Registered Events</h2>
      {events.length === 0 ? (
        <p className="no-events">No registered events yet.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.event_id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.event_time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <ReminderSettings userId={userId} eventId={event.event_id} defaultTime={60} />
              <button onClick={() => handleCancel(event.event_id)} className="cancel-btn">
                Cancel Registration
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
