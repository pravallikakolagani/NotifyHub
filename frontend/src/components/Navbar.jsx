function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* NotifyHub Logo */}
        <a href="/" className="notifyhub-logo">
          <span className="logo-icon">🔔</span>
          <span className="logo-text">
            Notify<span>Hub</span>
          </span>
        </a>

        {/* Navigation */}
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/announcements">Announcements</a>
          <a href="/events">Events</a>
          <a href="/queries">Queries</a>
          <a href="/admin">Admin</a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;