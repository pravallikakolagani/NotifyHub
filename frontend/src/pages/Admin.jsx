import { useEffect, useState } from "react";

function Admin() {
  // =========================
  // ANNOUNCEMENT STATES
  // =========================

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // EVENT STATES
  // =========================

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // =========================
  // QUERY STATES
  // =========================

  const [queries, setQueries] = useState([]);

  // =========================
  // LOAD STUDENT QUERIES
  // =========================

  useEffect(() => {
    fetch("http://localhost:5000/api/queries")
      .then((response) => response.json())
      .then((data) => {
        setQueries(data);
      })
      .catch((error) => {
        console.error("Failed to load queries:", error);
      });
  }, []);

  // =========================
  // ADD ANNOUNCEMENT
  // =========================

  const addAnnouncement = async () => {
    if (!title || !category || !description) {
      alert("Please fill all announcement fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/announcements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add announcement");
        return;
      }

      alert("Announcement added successfully!");

      setTitle("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to the backend.");
    }
  };

  // =========================
  // ADD EVENT
  // =========================

  const addEvent = async () => {
    if (
      !eventTitle ||
      !eventCategory ||
      !eventDescription ||
      !eventDate
    ) {
      alert("Please fill all required event fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: eventTitle,
            category: eventCategory,
            description: eventDescription,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add event");
        return;
      }

      alert("Event added successfully!");

      setEventTitle("");
      setEventCategory("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to the backend.");
    }
  };

  return (
    <div className="page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div className="page-label">
          ⚙️ ADMIN PANEL
        </div>

        <h1>
          Manage <span>NotifyHub</span>
        </h1>

        <p>
          Publish announcements and events and manage student queries.
        </p>

      </div>

      {/* =========================
          ANNOUNCEMENTS
      ========================= */}

      <div className="glass-card admin-card">

        <h2>📢 Add Announcement</h2>

        <p>
          Publish important college updates.
        </p>

        <br />

        <input
          type="text"
          placeholder="Announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Important">Important</option>
          <option value="Academic">Academic</option>
          <option value="Notice">Notice</option>
          <option value="Event">Event</option>
        </select>

        <textarea
          placeholder="Write announcement..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addAnnouncement}>
          📢 Publish Announcement
        </button>

      </div>

      {/* =========================
          EVENTS
      ========================= */}

      <div className="glass-card admin-card">

        <h2>🎉 Add Event</h2>

        <p>
          Create an upcoming college event.
        </p>

        <br />

        <input
          type="text"
          placeholder="Event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />

        <select
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
        >
          <option value="">Select event category</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Technical">Technical</option>
          <option value="Competition">Competition</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Describe the event..."
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Event location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />

        <button onClick={addEvent}>
          🎉 Publish Event
        </button>

      </div>

      {/* =========================
          STUDENT QUERIES
      ========================= */}

      <div className="glass-card admin-card">

        <h2>💬 Student Queries</h2>

        <p>
          View questions submitted by students.
        </p>

        <br />

        {queries.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              💭
            </div>

            <h3>No student queries yet</h3>

            <p>
              Student questions will appear here.
            </p>

          </div>

        ) : (

          <div>

            {queries.map((item) => (

              <div
                className="glass-card query-card"
                key={item.id}
                style={{ marginBottom: "18px" }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >

                  <h3 style={{ margin: 0 }}>
                    Query #{item.id}
                  </h3>

                  <span className="query-status">
                    {item.status || "Pending"}
                  </span>

                </div>

                <p style={{ marginTop: "15px" }}>
                  {item.text}
                </p>

                <small style={{ color: "#69728b" }}>
                  📅 {item.date}
                </small>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Admin;