import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail,
  Heart
} from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="rentlyst-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">Rentlyst</h3>
            <p className="footer-description">
              Find your perfect rental home with ease and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Properties</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Agents</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-contact">
            <h4>Connect</h4>
            <div className="contact-item">
              <Mail size={16} />
              <span>hello@rentlyst.com</span>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Rentlyst. All rights reserved. 
            Made with <Heart size={14} /> for better renting.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;