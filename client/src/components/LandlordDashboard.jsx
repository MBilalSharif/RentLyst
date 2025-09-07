import React from "react";
import "../styles/LandlordDashboard.css";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from "./NavLandlord";






const LandlordDashboard = () => {
  const navigate = useNavigate();

  const goToAddProperty = () => {
    navigate('/add-property');
  };

  const goToMyProperties = () => {
    navigate('/landlord-dashboard/my-properties');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToPremiumPlans = () => {
    navigate('/premium-plans');
  };

  return (
    <div className="landlord-dashboard-container">
      <Navbar/>
      <div className="landlord-dashboard">
        {/* Profile Icon in top left corner */}
        <div className="profile-icon-container" onClick={goToProfile}>
          <p>Profile</p>
          <FaUserCircle className="profile-icon" />
        </div>

        <h1>Welcome, Landlord!</h1>

        <div className="dashboard-column">
          <section className="dashboard-section">
            <h2>Add New Property</h2>
            <p>List a new property for renting on our platform</p>
            <div className="button-container">
              <button className="newaction-btn" onClick={goToAddProperty}>Add Property</button>
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Your Listed Properties</h2>
            <p>Manage all the properties you've listed for rent</p>
            <div className="button-container">
              <button className="action-btn" onClick={goToMyProperties}>View Listings</button>
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Feature Your Property</h2>
            <p>Get more visibility by promoting your property to top of search results</p>
            <div className="button-container">
              <button style={{ background: "rgba(138, 136, 23, 1)" , width:"175px", height:"60px"}} onClick={goToPremiumPlans}>Upgrade to Premium</button>
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Contact Our Team</h2>
            <p>Need assistance? Our support team is here to help you</p>
            <div className="button-container">
              <button className="action-btn">Contact Support</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;