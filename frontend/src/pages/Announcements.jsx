import { useEffect, useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((error) => {
        console.error("Failed to load announcements:", error);
      });
  }, []);

  const filteredAnnouncements = announcements.filter((item) =>
    `${item.title} ${item.category} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <div className="page-header">

        <div className="page-label">
          📢 COLLEGE UPDATES
        </div>

        <h1>
          Latest <span>Announcements</span>
        </h1>

        <p>
          Stay informed about everything important happening around your
          college.
        </p>

      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔎 Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredAnnouncements.length === 0 ? (

        <div className="glass-card empty-state">

          <div className="empty-icon">📭</div>

          <h2>No announcements yet</h2>

          <p>
            New college announcements will appear here as soon as they
            are published.
          </p>

        </div>

      ) : (

        <div className="card-grid">

          {filteredAnnouncements.map((item) => (

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

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <div className="card-date">
                🔔 Stay updated
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Announcements;