# 🔔 NotifyHub

### Your College Information Hub

NotifyHub is a college information and communication platform designed to keep students updated with important **announcements, upcoming events, and answers to their queries** — all in one place.

---

## 📌 About the Project

Students often need to check different platforms to find college announcements, event information, and answers to their questions.

**NotifyHub** brings these important college updates together in a simple and user-friendly web application.

The platform provides separate sections for:

* 📢 Announcements
* 📅 Events
* ❓ Queries
* 🔐 Admin Management

The project uses a **React + Vite frontend** with a **Node.js/Express backend** and **Neon PostgreSQL database** for storing application data.

---

## ✨ Features

### 🏠 Home

The Home page provides a quick overview of the college information hub.

It includes:

* Welcome section
* Latest announcements
* Upcoming events
* Quick navigation buttons
* Real-time update concept
* Event reminder section
* Ask questions section
* Trusted information section

---

### 📢 Announcements

Students can view important college announcements in a dedicated section.

Each announcement can contain:

* Title
* Category
* Description
* Date

Announcements are displayed using a clean card-based layout.

---

### 📅 Events

The Events section displays upcoming college activities and events.

Event information includes:

* Event title
* Event description
* Event category
* Date
* Time
* Location

The responsive layout changes automatically for smaller screens.

---

### ❓ Queries

Students can submit questions through the Queries section.

The system allows users to:

* Enter their query
* Submit the query
* Store the query in the database
* View submitted queries
* Track query status

The default query status is **Pending**.

---

### 🔐 Admin

The Admin section is designed for managing college information.

Administrators can add announcements with:

* Title
* Category
* Description

The information is stored in the backend database and can be displayed to users.

---

## 🗄️ Database

NotifyHub uses **Neon PostgreSQL** as its database.

The backend connects to the database using the following environment variable:

```env
DATABASE_URL=your_neon_database_url
PORT=5000
```

The database is used for storing application information instead of relying only on browser storage.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js

### Database

* Neon PostgreSQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Chrome DevTools

---

## 📂 Project Structure

```text
NotifyHub/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Announcements.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Queries.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

> The exact folder structure may vary depending on the final project organization.

---

## 🚀 Getting Started

Follow these steps to run NotifyHub locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then move into the project folder:

```bash
cd NotifyHub
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Start the Frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

### 4. Install Backend Dependencies

Open another terminal and move to the backend folder:

```bash
cd backend
npm install
```

---

### 5. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=your_neon_database_url
PORT=5000
```

Replace `your_neon_database_url` with your actual Neon PostgreSQL connection string.

**Do not upload your `.env` file to GitHub.**

Add this to `.gitignore`:

```text
.env
node_modules
```

---

### 6. Start the Backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

## 🔗 Backend API

The application communicates with the backend through API endpoints.

### Health Check

```text
GET /
```

Used to check whether the backend is running.

### Database Test

```text
GET /api/test-db
```

Used to verify the Neon PostgreSQL connection.

### Queries

```text
GET /api/queries
```

Retrieves submitted queries.

```text
POST /api/queries
```

Creates a new query.

Example request:

```json
{
  "text": "What is the schedule for the upcoming event?"
}
```

---

## 📱 Responsive Design

NotifyHub is designed to work across different screen sizes.

The interface supports:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet-sized screens

The mobile layout reorganizes sections and cards vertically to provide a better user experience on smaller screens.

---

## 🎨 UI Design

NotifyHub uses a modern college-focused interface with:

* Purple and blue gradient theme
* Rounded cards
* Responsive layouts
* Clear navigation
* Visual icons
* Announcement and event cards
* Mobile-friendly design

The goal is to keep the interface **simple, attractive, and easy to use**.

---

## 🔒 Environment Variables

The following variables are required for the backend:

```env
DATABASE_URL=
PORT=5000
```

Never commit sensitive credentials or `.env` files to GitHub.

---

## 🌐 Deployment

The frontend can be deployed using platforms such as **Vercel**.

For a Vite frontend, the production build can be generated using:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

The backend and PostgreSQL database should also be configured with their required environment variables when deployed.

---

## 🔮 Future Enhancements

Possible future improvements include:

* 🔔 Browser push notifications
* 📧 Email notifications
* 👤 Student authentication
* 🔐 Admin authentication
* 📊 Admin dashboard
* 🔎 Search and filtering
* 📅 Calendar integration
* 📱 Progressive Web App support
* 🖼️ Image and document attachments
* 📈 Analytics for announcements and events

---

## 🎯 Project Objective

The main objective of NotifyHub is to provide students with a **single, reliable platform for college communication**.

Instead of searching through multiple platforms, students can use NotifyHub to quickly access:

**Announcements + Events + Queries + Important College Information**

in one place.

---

## 👩‍💻 Developed By

**Pravallika Kolagani**

### NotifyHub — Stay Connected. Stay Informed. 🔔

---
