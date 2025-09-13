

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import RentingListings from './components/RentingListings';
import LandlordRegister from './components/LandlordRegister';
import LandlordDashboard from './components/LandlordDashboard';
import AddRentalProperty from './components/AddRentalProperty';
import MyListedProperties from './components/MyListedProperties';
import EditProperty from './components/EditProperty';
import LandlordProfile from './components/LandlordProfile';
import About from './components/About';
import PrivateRoute from './components/PrivateRoutes';
import PropertyDetail from './components/PropertyDetail';
import PremiumPlans from './components/PremiumPlans';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landlord-register" element={<LandlordRegister />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/rent" element={<RentingListings />} />
        <Route path="/about" element={<About />} />
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* Landlord-protected routes */}
        <Route
          path="/landlord-dashboard"
          element={
            <PrivateRoute role="landlord">
              <LandlordDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <PrivateRoute role="landlord">
              <AddRentalProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/landlord-dashboard/my-properties"
          element={
            <PrivateRoute role="landlord">
              <MyListedProperties />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute role="landlord">
              <LandlordProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/premium-plans"
          element={
            <PrivateRoute role="landlord">
              <PremiumPlans />
            </PrivateRoute>
          }
        />


        <Route
          path="/edit-property/:id"
          element={
            <PrivateRoute role="landlord">
              <EditProperty />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
