import React from 'react';
import { Link } from 'react-router-dom';


const TruliaHelp = () => {
  return (
    <section className="trulia-help">
      <h1>How RentIt Can Help</h1>
      <div className="help-cards">
        <div className="help-card">
          <h2>Buy a Home</h2>
          <p>Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.</p>
          <Link to="/listings">Search Homes</Link>
        </div>
        <div className="help-card">
          <h2>Rent a Home</h2>
          <p>We're creating a seamless online experience – from shopping on the largest rental network to applying to paying rent.</p>
          <a className="help-link" href="#">Search Rentals</a>
        </div>
        <div className="help-card">
          <h2>Sell a Home</h2>
          <p>No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
          <a className="help-link" href="#">See Your Options</a>
        </div>
      </div>
    </section>
  );
};

export default TruliaHelp;
