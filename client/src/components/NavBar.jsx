import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Optional: Create this if needed for scoped styles

const Navbar = () => (
    <header className="header">
        <div className="container">
            <div className="header-content">
                <div className="logo">
                    <Home className="logo-icon" />
                    <span className="logo-text">RentLyst</span>
                </div>
                <nav className="nav">
                    <Link to="/LandingPage" className="navlinkss">Home</Link>
                    <Link to="/rent" className="navlinkss">Rental Listing</Link>
                    {/* <Link to="/listings" className="nav-link">Buy</Link> */}
                    <Link to="/landlord-register" className="navlinkss">Become Landlord</Link>
                    <Link to="/about" className="navlinkss">About</Link>
                </nav>
                <div className="auth-buttons">
                    <Link to="/login" className="btn-ghost">Sign In</Link>
                    <Link to="/register" className="btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    </header>
);

export default Navbar;
