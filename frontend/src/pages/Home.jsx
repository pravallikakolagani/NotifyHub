import { useEffect, useState } from "react";

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Get latest announcements
    fetch("http://localhost:5000/api/announcements")
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Failed to load announcements:", error);
      });

    // Get latest events
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Failed to load events:", error);
      });
  }, []);

  return (
    <div className="home-page">

      {/* =========================
          EXISTING HERO
      ========================= */}

      <section className="hero">

        <div className="hero-left">

          <div className="hero-badge">
            🎓 Your College Information Hub
          </div>

          <h1>
            Welcome to <span>NotifyHub</span>
          </h1>

          <p>
            Stay connected with everything happening in your college.
            Get important announcements, upcoming events and answers
            to your questions — all in one place.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() => {
                window.location.href = "/announcements";
              }}
            >
              📢 View Announcements
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                window.location.href = "/events";
              }}
            >
              🗓️ Explore Events
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="notification-circle">

            <div className="bell">
              🔔
            </div>

            <div className="signal">
              |||
            </div>

            <h2>
              Stay in the Loop
            </h2>

            <p>
              Your college updates, right when you need them.
            </p>

            <div className="live">
              ● LIVE UPDATES
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          LATEST ANNOUNCEMENTS
      ========================= */}

      <section className="home-section">

        <div className="home-section-header">

          <div>
            <div className="page-label">
              📢 COLLEGE UPDATES
            </div>

            <h2>
              Latest <span>Announcements</span>
            </h2>
          </div>

          <button
            className="secondary-btn"
            onClick={() => {
              window.location.href = "/announcements";
            }}
          >
            View All →
          </button>

        </div>


        {announcements.length === 0 ? (

          <div className="glass-card empty-state">

            <div className="empty-icon">
              📭
            </div>

            <h3>
              No announcements yet
            </h3>

            <p>
              New college announcements will appear here.
            </p>

          </div>

        ) : (

          <div className="card-grid">

            {announcements.map((item) => (

              <div
                className="glass-card announcement-card"
                key={item.id}
              >

                <div className="announcement-top">

                  <span className="category-badge">
                    {item.category || "General"}
                  </span>

                  <span className="card-date">
                    📅 {item.date}
                  </span>

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =========================
          UPCOMING EVENTS
      ========================= */}

      <section className="home-section">

        <div className="home-section-header">

          <div>

            <div className="page-label">
              🎉 CAMPUS ACTIVITIES
            </div>

            <h2>
              Upcoming <span>Events</span>
            </h2>

          </div>

          <button
            className="secondary-btn"
            onClick={() => {
              window.location.href = "/events";
            }}
          >
            View All →
          </button>

        </div>


        {events.length === 0 ? (

          <div className="glass-card empty-state">

            <div className="empty-icon">
              🗓️
            </div>

            <h3>
              No upcoming events
            </h3>

            <p>
              New college events will appear here when they are published.
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

                <h3>
                  {event.title}
                </h3>

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

      </section>

    </div>
  );
}

export default Home;