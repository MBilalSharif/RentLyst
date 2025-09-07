import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/rent?location=${search}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Dream Home</h1>
        <p>Search through thousands of listings from trusted owners and agents across the country.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
