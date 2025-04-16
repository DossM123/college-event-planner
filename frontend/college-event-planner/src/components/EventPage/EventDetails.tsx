import React, { useState } from 'react';

interface Event {
  event_id: number;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  description: string;
  organizer_id: number;
}

interface Organizer {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  year_of_study: number;
}

interface EventDetailsButtonProps {
  event: Event;
}

const EventDetailsButton: React.FC<EventDetailsButtonProps> = ({ event }) => {
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/organizers/${event.organizer_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch organizer details');
      }
      const data: Organizer = await response.json();
      setOrganizer(data);
      setShowDetails(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!showDetails) fetchOrganizer();
    else setShowDetails(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
        onClick={handleClick}
      >
        {showDetails ? 'Hide Details' : 'Details'}
      </button>

      {loading && <p className="text-gray-500 mt-2">Loading organizer...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {showDetails && (
        <div className="mt-4 p-4 border rounded bg-gray-50 text-sm">
          <h4 className="font-bold mb-2 text-lg">Event Details</h4>
          <p><strong>Title:</strong> {event.title}</p>
          <p><strong>Date:</strong> {event.event_date}</p>
          <p><strong>Time:</strong> {event.event_time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.description}</p>

          {organizer && (
            <>
              <h4 className="font-bold mt-4 mb-2 text-lg">Organizer Info</h4>
              <p><strong>Name:</strong> {organizer.name}</p>
              <p><strong>Email:</strong> {organizer.email}</p>
              <p><strong>Phone:</strong> {organizer.phone}</p>
              <p><strong>Year of Study:</strong> {organizer.year_of_study}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetailsButton;
