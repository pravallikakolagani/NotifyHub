import { useEffect, useState } from "react";

function Queries() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);

  // Load queries from Neon
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

  // Submit query to Neon
  const submitQuery = async () => {
    if (!query.trim()) {
      alert("Please enter your query.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/queries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: query,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit query");
        return;
      }

      // Add the new query to the screen
      setQueries((previous) => [data, ...previous]);

      setQuery("");

      alert("Query submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to the backend.");
    }
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div className="page-label">
          💬 STUDENT SUPPORT
        </div>

        <h1>
          Ask Your <span>Questions</span>
        </h1>

        <p>
          Have a question? Send it here and keep track of your queries.
        </p>

      </div>

      {/* QUERY FORM */}

      <div className="glass-card query-form">

        <h2>📝 Submit a Query</h2>

        <p>
          Tell us what you need help with.
        </p>

        <textarea
          placeholder="Write your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={submitQuery}
        >
          🚀 Submit Query
        </button>

      </div>

      {/* MY QUERIES */}

      <div
        className="page-header"
        style={{ marginBottom: "25px" }}
      >

        <h2 style={{ fontSize: "32px" }}>
          My <span>Queries</span>
        </h2>

      </div>

      {queries.length === 0 ? (

        <div className="glass-card empty-state">

          <div className="empty-icon">
            💭
          </div>

          <h2>No queries yet</h2>

          <p>
            Your submitted questions will appear here.
          </p>

        </div>

      ) : (

        <div>

          {queries.map((item) => (

            <div
              className="glass-card query-card"
              key={item.id}
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
                  {item.status}
                </span>

              </div>

              <p>
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
  );
}

export default Queries;