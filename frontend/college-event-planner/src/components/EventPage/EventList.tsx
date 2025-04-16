import React, { useState, useEffect } from 'react';
import EventDetailsButton from './EventDetails';
import RegisterButton from './EventRegister';
import '../../styles/EventList.css';
import SearchBar from './SearchBar';

interface Event {
  event_id: number;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  description: string;
  organizer_id: number;
}

interface EventListProps {
  categoryId: number | null;
}

const EventList: React.FC<EventListProps> = ({ categoryId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);

  const storedUserId = localStorage.getItem('user_id');
  const userId = storedUserId ? parseInt(storedUserId) : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getEventStatus = (
    eventDateStr: string,
    eventTimeStr: string
  ): 'Today' | 'Past' | 'Upcoming' => {
    const now = new Date();

    const datePart = eventDateStr.includes('T')
      ? new Date(eventDateStr)
      : new Date(`${eventDateStr}T00:00:00`);

    if (isNaN(datePart.getTime())) return 'Upcoming';

    const year = datePart.getFullYear();
    const month = datePart.getMonth();
    const day = datePart.getDate();

    const [hourStr = '00', minuteStr = '00', secondStr = '00'] = eventTimeStr.split(':');
    const hours = parseInt(hourStr);
    const minutes = parseInt(minuteStr);
    const seconds = parseInt(secondStr);

    const eventDateTime = new Date(year, month, day, hours, minutes, seconds);

    const isSameDay = now.toDateString() === eventDateTime.toDateString();

    if (eventDateTime < now) return 'Past';
    if (isSameDay) return 'Today';
    return 'Upcoming';
  };

  const fetchEvents = async () => {
    try {
      let url = '';

      if (debouncedSearchTerm) {
        url = `http://localhost:3000/event/search?q=${encodeURIComponent(debouncedSearchTerm)}`;
      } else if (categoryId !== null) {
        url = `http://localhost:3000/events/view?categoryId=${categoryId}`;
      } else {
        url = 'http://localhost:3000/events/view';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const eventsArray: Event[] = Array.isArray(data) ? data : data.events || [];
      setEvents(eventsArray);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [categoryId, debouncedSearchTerm]);

  if (loading) return <div className="event-loading">Loading events...</div>;

  if (error) {
    return (
      <div className="event-error">
        <p>Error: {error}</p>
        <button
          className="retry-button"
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchEvents();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const categorized = {
    past: [] as Event[],
    today: [] as Event[],
    upcoming: [] as Event[],
  };

  events.forEach((event) => {
    const status = getEventStatus(event.event_date, event.event_time);
    if (status === 'Past') categorized.past.push(event);
    else if (status === 'Today') categorized.today.push(event);
    else categorized.upcoming.push(event);
  });

  const renderEvents = (list: Event[], label: string) => (
    <>
      {list.length > 0 && <h3 className="event-section-heading">{label}</h3>}
      <div className="event-grid">
        {list.map((event) => {
          const status = getEventStatus(event.event_date, event.event_time);
          return (
            <div key={event.event_id} className="event-card">
              <h3 className="event-title">{event.title || 'Untitled'}</h3>
              
              <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>

              <p className={`event-status ${status.toLowerCase()}`}>{status}</p>

              <p><strong>Time:</strong> {event.event_time || 'N/A'}</p>
              <p><strong>Location:</strong> {event.location || 'N/A'}</p>
              <p><strong>Description:</strong> {event.description || 'No description'}</p>
              <p><strong>Organizer ID:</strong> {event.organizer_id ?? 'N/A'}</p>
              
                <div className='EventButton'>
                <RegisterButton userId={userId} eventId={event.event_id} disabled={status === 'Past'} />
                <EventDetailsButton event={event} />
                </div>
              
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Upcoming Events</h2>
      <SearchBar query={searchTerm} onChange={setSearchTerm} /><br />

      {events.length === 0 ? (
        <p className="no-events-message">No events found matching your search.</p>
      ) : (
        <>
        <div>
            <button className="toggle-past-button" onClick={() => setShowPastEvents(!showPastEvents)}>
              {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
            </button>
          </div>
          {showPastEvents && renderEvents(categorized.past, 'Past')}
          {renderEvents(categorized.today, 'Today')}
          {renderEvents(categorized.upcoming, 'Upcoming')}
          
          
        </>
      )}
    </div>
  );
};

export default EventList;