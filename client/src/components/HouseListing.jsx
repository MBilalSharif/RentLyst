import React, { useEffect, useState } from 'react';
import '../styles/HouseListing.css';
import ListingCard from './ListingCard';

const HouseListing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <div className="listing-page">
      <h1 className="listing-title">Browse Houses</h1>
      <div className="listing-grid">
        {listings.map((property) => (
          <ListingCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HouseListing;
