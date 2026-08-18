import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sql from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   TEST
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "NotifyHub backend is running",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;

    res.json({
      success: true,
      message: "Neon PostgreSQL connected successfully!",
      time: result[0].now,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* =========================
   ANNOUNCEMENTS
========================= */

// GET announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await sql`
      SELECT *
      FROM announcements
      ORDER BY created_at DESC
    `;

    res.json(announcements);
  } catch (error) {
    console.error("FETCH ANNOUNCEMENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch announcements",
    });
  }
});

// ADD announcement
app.post("/api/announcements", async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const date = new Date().toLocaleDateString();

    const result = await sql`
      INSERT INTO announcements
      (title, category, description, date)
      VALUES
      (${title}, ${category}, ${description}, ${date})
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("ADD ANNOUNCEMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to add announcement",
    });
  }
});

// EDIT announcement
app.put("/api/announcements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const result = await sql`
      UPDATE announcements
      SET
        title = ${title},
        category = ${category},
        description = ${description}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("UPDATE ANNOUNCEMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to update announcement",
    });
  }
});

// DELETE announcement
app.delete("/api/announcements/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM announcements
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    res.json({
      message: "Announcement deleted successfully",
      announcement: result[0],
    });
  } catch (error) {
    console.error("DELETE ANNOUNCEMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete announcement",
    });
  }
});

/* =========================
   EVENTS
========================= */

// GET events
app.get("/api/events", async (req, res) => {
  try {
    const events = await sql`
      SELECT *
      FROM events
      ORDER BY created_at DESC
    `;

    res.json(events);
  } catch (error) {
    console.error("FETCH EVENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
});

// ADD event
app.post("/api/events", async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      date,
      time,
      location,
    } = req.body;

    if (!title || !category || !description || !date) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const result = await sql`
      INSERT INTO events
      (title, category, description, date, time, location)
      VALUES
      (
        ${title},
        ${category},
        ${description},
        ${date},
        ${time || ""},
        ${location || ""}
      )
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("ADD EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to add event",
    });
  }
});

// EDIT event
app.put("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      description,
      date,
      time,
      location,
    } = req.body;

    if (!title || !category || !description || !date) {
      return res.status(400).json({
        message: "Please fill all required event fields",
      });
    }

    const result = await sql`
      UPDATE events
      SET
        title = ${title},
        category = ${category},
        description = ${description},
        date = ${date},
        time = ${time || ""},
        location = ${location || ""}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
});

// DELETE event
app.delete("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM events
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
      event: result[0],
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete event",
    });
  }
});

/* =========================
   QUERIES
========================= */

// GET queries
app.get("/api/queries", async (req, res) => {
  try {
    const queries = await sql`
      SELECT *
      FROM queries
      ORDER BY created_at DESC
    `;

    res.json(queries);
  } catch (error) {
    console.error("FETCH QUERIES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch queries",
    });
  }
});

// SUBMIT query
app.post("/api/queries", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Please enter your query",
      });
    }

    const date = new Date().toLocaleDateString();

    const result = await sql`
      INSERT INTO queries
      (text, status, date)
      VALUES
      (${text.trim()}, 'Pending', ${date})
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("SUBMIT QUERY ERROR:", error);

    res.status(500).json({
      message: "Failed to submit query",
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `NotifyHub backend running on http://localhost:${PORT}`
  );
});