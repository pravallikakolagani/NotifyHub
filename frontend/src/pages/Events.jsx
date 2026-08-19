import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://notify-hub-a5mm.vercel.app/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Failed to load events:", error);
      });
  }, []);

  return (
    <div className="page">

      <div className="page-header">

        <div className="page-label">
          🎉 CAMPUS ACTIVITIES
        </div>

        <h1>
          Upcoming <span>Events</span>
        </h1>

        <p>
          Discover workshops, activities and exciting events happening
          around your college.
        </p>

      </div>

      {events.length === 0 ? (

        <div className="glass-card empty-state">

          <div className="empty-icon">
            🗓️
          </div>

          <h2>No upcoming events</h2>

          <p>
            New college events will appear here when the admin adds them.
          </p>

        </div>

      ) : (

        <div className="card-grid">

          {events.map((event) => (

            <div
              className="glass-card event-card"
              key={event.id}
            >

              <div className="event-icon">
                🎓
              </div>

              <span className="category-badge">
                {event.category || "College Event"}
              </span>

              <h2>{event.title}</h2>

              <p>
                {event.description}
              </p>

              <div className="event-date">
                📅 {event.date}
              </div>

              {event.time && (
                <div className="event-date">
                  ⏰ {event.time}
                </div>
              )}

              {event.location && (
                <div className="event-date">
                  📍 {event.location}
                </div>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Events;