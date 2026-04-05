import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

/*
  Navbar component

  This handles both desktop and mobile navigation. On mobile, we show
  a hamburger button that slides in a menu from the right side. The
  user dropdown (profile, logout) is a simple toggle that closes when
  you click outside of it.
*/

function Navbar() {
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // close mobile menu when navigating to a new page
  function handleNavClick() {
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  // close dropdown/mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
    handleNavClick();
  }

  // Links configuration for reuse
  const navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/workshops', label: 'Workshops', icon: 'explore' },
    { path: '/statistics', label: 'Stats', icon: 'analytics' },
  ];

  // figure out the user's initials for the avatar circle
  function getUserInitials() {
    if (!user) return '?';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase();
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">

        <Link to="/" className="navbar-brand" onClick={handleNavClick}>
          <div className="brand-icon">
            <span className="material-icons-round">school</span>
          </div>
          <span className="brand-text">FOSSEE Workshops</span>
        </Link>

        {/* Desktop Links (Hidden on mobile) */}
        <ul className="navbar-links desktop-only" role="menubar">
          {navLinks.map((link) => (
            <li key={link.path} role="none">
              <NavLink 
                to={link.path} 
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleNavClick}
                role="menuitem"
              >
                <span className="material-icons-round" style={{ fontSize: '18px' }}>{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger, ThemeToggle, and User Menu grouped on the right */}
        <div className="navbar-right">
          <ThemeToggle />

          {user ? (
            <div className="navbar-user" ref={dropdownRef}>
              <button
                className="user-menu-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <div className="user-avatar">{getUserInitials()}</div>
                <span className="user-name-desktop">{user.firstName}</span>
                <span className="material-icons-round" style={{ fontSize: '18px' }}>
                  {dropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={handleNavClick}>
                    <span className="material-icons-round">person</span>
                    My Profile
                  </Link>
                  <div className="divider"></div>
                  <button onClick={handleLogout}>
                    <span className="material-icons-round">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-desktop">
              <Link to="/login" className="btn btn-secondary btn-sm" onClick={handleNavClick}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={handleNavClick}>
                Sign Up
              </Link>
            </div>
          )}

          <button
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <ul 
        className={`navbar-links mobile-only ${mobileOpen ? 'open' : ''}`}
        role="menu"
        aria-hidden={!mobileOpen}
      >
        <li className="mobile-menu-header">Menu</li>
        {navLinks.map((link) => (
          <li key={link.path} role="none">
            <NavLink 
              to={link.path} 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={handleNavClick}
              role="menuitem"
            >
              <span className="material-icons-round">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
        {/* Mobile-only Auth Links (if not logged in) */}
        {!user && (
          <>
            <div className="divider"></div>
            <li role="none">
              <Link to="/login" onClick={handleNavClick} role="menuitem">
                <span className="material-icons-round">login</span>
                Sign In
              </Link>
            </li>
            <li role="none">
              <Link to="/register" onClick={handleNavClick} role="menuitem">
                <span className="material-icons-round">person_add</span>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* dark overlay behind mobile menu */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      ></div>
    </nav>
  );
}

export default Navbar;
