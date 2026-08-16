function Navbar() {
  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div
          className="logo"
          onClick={() => goTo("/")}
        >
          NotifyHub
        </div>

        <div className="nav-links">
          <button onClick={() => goTo("/")}>Home</button>
          <button onClick={() => goTo("/announcements")}>
            Announcements
          </button>
          <button onClick={() => goTo("/events")}>
            Events
          </button>
          <button onClick={() => goTo("/queries")}>
            Queries
          </button>
          <button onClick={() => goTo("/admin")}>
            Admin
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;