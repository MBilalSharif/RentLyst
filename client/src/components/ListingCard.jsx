import React from 'react';
import '../styles/ListingCard.css';

const ListingCard = ({ property }) => {
  return (
    <div className="listing-card">
      {property.images.map((img, index) => (
        <img key={index} src={img} alt={`Property ${index + 1}`} />
      ))}
      <div className="listing-details">
        <h2>{property.title}</h2>
        <p className="location">{property.location}</p>
        {/* <p className="description">{property.description}</p> */}
        <p className="price">Rs. {property.price.toLocaleString()}</p>
        <p className="area">{property.area}</p>
      </div>
    </div>
  );
};

export default ListingCard;
