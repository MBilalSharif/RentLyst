import React, { useState } from 'react';
import { Bell, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavLandlord.css';

const LandlordNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    // Clear saved auth data
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="landlord-navbar">
      <div className="nav-container">
        {/* Logo and Brand */}
        <div className="nav-brand">
          <a href="/landlord/dashboard" className="brand-link">
            <span className="brand-logo">Rentlyst</span>
            <span className="brand-subtitle">Landlord Portal</span>
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Notifications */}
          <button className="nav-icon-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          {/* Sign Out Button with text */}
          <button className="signout-btn" aria-label="Sign out" onClick={handleSignOut}>
            <LogOut size={20} />
            <span>Signout</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Simplified */}
      {isMenuOpen && (
        <div className="nav-mobile">
          <ul className="mobile-nav-links">
            <li>
              <button className="mobile-nav-link" aria-label="Notifications">
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </li>
            <li>
              <button className="mobile-nav-link logout-btn" onClick={handleSignOut}>
                <LogOut size={20} />
                <span>Signout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default LandlordNavbar;
