import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./NavBar";
import '../styles/RentingListings.css';
import Footer from './Footer';

const RentingListings = () => {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ useNavigate hook

  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get('location');

  useEffect(() => {
    let url = 'http://localhost:5000/api/rentals';
    if (searchLocation) {
      url += `?location=${encodeURIComponent(searchLocation)}`;
    }

    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRentals(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching rentals:', err);
        setIsLoading(false);
      });
  }, [searchLocation]);

  // ✅ Navigate to property detail page
  const navigateToDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="renting-page">
        <div className="page-header">
          <h1>Available Rentals</h1>
          {searchLocation && <p className="search-location">Showing results for <span>"{searchLocation}"</span></p>}
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : rentals.length === 0 ? (
          <div className="no-results">
            <img src="/images/no-results.svg" alt="No results" />
            <p>No rentals found for the specified location.</p>
            <button className="explore-button">Explore All Properties</button>
          </div>
        ) : (
          <div className="rental-listings">
            {rentals.map((property, index) => (
              <div 
                className="rental-card" 
                key={property._id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image">
                  {/* ✅ Display first image if available */}
                  {property.image && property.image.length > 0 ? (
                    <img 
                      src={property.image[0]} 
                      alt={property.title || "Rental"} 
                    />
                  ) : (
                    <img 
                      src="/images/placeholder.png" 
                      alt="No image available" 
                    />
                  )}
                  <div className="price-tag">Rs. {property.price}</div>
                </div>
                <div className="rental-details">
                  <h2>{property.title}</h2>
                  <p className="description">{property.description}</p>
                  <div className="property-features">
                    <span><i className="fas fa-map-marker-alt"></i> Location: {property.location}</span>
                    <span><i className="fas fa-ruler-combined"></i> Area: {property.area} sq.ft</span>
                  </div>
                  {/* ✅ Fixed onClick */}
                  <button 
                    className="view-details" 
                    onClick={() => navigateToDetails(property._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RentingListings;
