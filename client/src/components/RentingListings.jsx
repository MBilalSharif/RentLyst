import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./NavBar";
import '../styles/RentingListings.css';
import Footer from './Footer';
import API from '../api';

const RentingListings = () => {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Filters
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get("location");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setIsLoading(true);

        let endpoint = "/rentals";
        if (searchLocation) {
          endpoint += `?location=${encodeURIComponent(searchLocation)}`;
          setFilters(prev => ({ ...prev, location: searchLocation }));
        }

        console.log("Fetching rentals from:", API.defaults.baseURL + endpoint);

        const res = await API.get(endpoint);
        setRentals(res.data);
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, [searchLocation]);

  // 🔹 Handle filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Filter logic
  const filteredRentals = useMemo(() => {
    return rentals.filter(property => {
      const matchesLocation =
        !filters.location ||
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesPrice =
        (!filters.minPrice || property.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= Number(filters.maxPrice));

      const matchesArea =
        (!filters.minArea || property.area >= Number(filters.minArea)) &&
        (!filters.maxArea || property.area <= Number(filters.maxArea));

      return matchesLocation && matchesPrice && matchesArea;
    });
  }, [rentals, filters]);

  const navigateToDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="renting-page">
        <div className="page-header">
          <h1>Available Rentals</h1>
          {searchLocation && (
            <p className="search-location">
              Showing results for <span>"{searchLocation}"</span>
            </p>
          )}
        </div>

        {/* 🔹 FILTER SECTION */}
        <div className="filter-section">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
          />

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="minArea"
            placeholder="Min Area (sq.ft)"
            value={filters.minArea}
            onChange={handleChange}
          />

          <input
            type="number"
            name="maxArea"
            placeholder="Max Area (sq.ft)"
            value={filters.maxArea}
            onChange={handleChange}
          />
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : filteredRentals.length === 0 ? (
          <div className="no-results">
            <img src="/images/no-results.svg" alt="No results" />
            <p>No rentals match your filters.</p>
          </div>
        ) : (
          <div className="rental-listings">
            {filteredRentals.map((property, index) => (
              <div
                className="rental-card"
                key={property._id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image">
                  {property.image && property.image.length > 0 ? (
                    <img src={property.image[0]} alt={property.title} />
                  ) : (
                    <img src="/images/placeholder.png" alt="No image" />
                  )}
                  <div className="price-tag">Rs. {property.price}</div>
                </div>

                <div className="rental-details">
                  <h2>{property.title}</h2>
                  <p className="description">{property.description}</p>

                  <div className="property-features">
                    <span>📍 {property.location}</span>
                    <span>📐 {property.area} sq.ft</span>
                  </div>

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
