import React, { useState } from 'react';
import '../styles/Landing.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Star,
  Phone,
  Mail,
  Clock,
  Heart,
  ArrowRight
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  // ✅ Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "" // clear error when typing
    });
  };

  // ✅ Validate form
  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (validateForm()) {
      setSuccessMessage("Thank you! Your message has been sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });

      // ✅ Refresh page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  // ✅ Handle search submit
  const handleSearch = async () => {
    if (!location.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/properties?location=${location}`);
      const data = await response.json();
      navigate('/rent', { state: { properties: data } });
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const properties = [
    {
      id: 1,
      title: "2 Bed Apartment",
      location: "Lahore, Punjab",
      price: "$2,800",
      period: "month",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      type: "Apartment",
      rating: 4.9,
      featured: true,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Studio Apartment",
      location: "Islamabad, Pakistan",
      price: "$3,500",
      period: "month",
      beds: 1,
      baths: 1,
      sqft: "1,800",
      type: "Condo",
      rating: 4.8,
      featured: false,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Cozy SeaView House",
      location: "Karachi, Sindh",
      price: "$1,950",
      period: "month",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      type: "House",
      rating: 4.7,
      featured: false,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="landing-page">
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star className="badge-icon" />
              No.1 Rental Platform
            </div>
            <h1 className="hero-title">
              Find Your Perfect
              <span className="gradient-text"> Rental Home</span>
            </h1>
            <p className="hero-description">
              Discover thousands of quality rental properties in prime locations.
              From cozy apartments to luxury homes, find your next home with ease and confidence.
            </p>

            {/* ✅ Single Search Bar */}
            <div className="search-form single">
              <div className="input-wrapper">
                <MapPin className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter location name..." 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                  style={{ marginLeft: "3px" }}
                />
              </div>
              <button className="btn-hero" onClick={handleSearch}>
                <Search className="btn-icon" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="properties-section">
        <div className="container">
          <div className="featured-propertiesdiv">
            <div className="properties-text">
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-description">
                Discover our handpicked selection of premium rental properties
              </p>
            </div>
          </div>

          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image-container">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="property-image"
                  />
                  <div className="property-badges">
                    {property.featured && (
                      <span className="badge featured">Featured</span>
                    )}
                    <span className="badge type">{property.type}</span>
                  </div>
                  <button className="favorite-btn">
                    <Heart />
                  </button>
                </div>
                <div className="property-content">
                  <div className="property-header">
                    <h3 className="property-title"  style={{ backgroundColor: '#8dc0ecff', padding: '8px', borderRadius: '8px' }}>{property.title}</h3>
                    <div className="property-rating">
                      <Star className="star-icon" />
                      <span className="rating-text">{property.rating}</span>
                    </div>
                  </div>
                  <div className="property-location">
                    <MapPin className="location-icon" />
                    <span className="location-text">{property.location}</span>
                  </div>
                  <div className="property-details">
                    <div className="detail-item">
                      <Bed className="detail-icon" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="detail-item">
                      <Bath className="detail-icon" />
                      <span>{property.baths}</span>
                    </div>
                    <span className="sqft">{property.sqft} sqft</span>
                  </div>
                  <div className="property-footer">
                    <div className="property-price">
                      <span className="price">{property.price}</span>
                      <span className="period">/{property.period}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Button moved outside grid */}
          <div className="see-all-container">
            <button
              className="see-allProperty"
              onClick={() => navigate('/rent')}
            >
              View All Properties
              <ArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-description">
                Ready to find your dream rental? Our expert team is here to help you
                every step of the way. Contact us today to get started.
              </p>
              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-icon phone">
                    <Phone />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Call Us</p>
                    <p className="contact-value">(+92) 11234763</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon email">
                    <Mail />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Email Us</p>
                    <p className="contact-value">RentLyst@gmail.com.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon hours">
                    <Clock />
                  </div>
                  <div className="contact-details">
                    <p className="contact-label">Business Hours</p>
                    <p className="contact-value">Mon-Fri: 9AM-6PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Contact Form */}
            <div className="contact-form-card">
              <h3 className="form-title">Send us a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="John"
                    />
                    {formErrors.firstName && <p className="error-text">{formErrors.firstName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Doe"
                    />
                    {formErrors.lastName && <p className="error-text">{formErrors.lastName}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <p className="error-text">{formErrors.email}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="How can we help you?"
                  />
                  {formErrors.subject && <p className="error-text">{formErrors.subject}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us about your rental needs..."
                    rows="4"
                  ></textarea>
                  {formErrors.message && <p className="error-text">{formErrors.message}</p>}
                </div>
                <button type="submit" className="btn-primary full-width">
                  Send Message
                  <ArrowRight className="btn-icon" />
                </button>
                {successMessage && <p className="success-text">{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      
    </div>
  );
};

export default LandingPage;