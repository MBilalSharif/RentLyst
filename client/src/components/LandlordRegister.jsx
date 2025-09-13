import React, { useState } from 'react';
import '../styles/LandlordRegister.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import Footer from './Footer';
import API from '../api';

const LandlordRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    companyName: '',
    taxId: '',
    bankAccount: '',
    yearsExperience: '',
    bio: '',
    profileImage: null,
    governmentId: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.taxId) newErrors.taxId = 'Tax ID is required';
    if (!formData.bankAccount) newErrors.bankAccount = 'Bank account is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsSubmitting(true);
try {
  const formDataToSend = new FormData();
  for (const key in formData) {
    if (formData[key] !== null) {
      formDataToSend.append(key, formData[key]);
    }
  }
  formDataToSend.append("role", "landlord");

  const res = await API.post("/auth/register-landlord", formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = res.data;

  // ✅ Store token and role immediately after registration
  if (data.token && data.user) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.user.role);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    navigate("/login");
  } else {
    alert("Registered successfully! Please login.");
    navigate("/login");
  }
} catch (error) {
  console.error("Landlord registration error:", error);
  alert("Server error");
} finally {
  setIsSubmitting(false);
}
};

return (
  <>
    <div>
      <Navbar />
    </div>
    <div className="landlord-register-container">
      <div className="landlord-register-card">
        <div className="landlord-register-header">
          <h2>Become a Landlord</h2>
          <p>Join our platform and start managing your properties</p>
        </div>

        <form onSubmit={handleSubmit} className="landlord-register-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Business Information</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tax ID*</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className={errors.taxId ? 'error' : ''}
              />
              {errors.taxId && <span className="error-message">{errors.taxId}</span>}
            </div>

            <div className="form-group">
              <label>Bank Account*</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                className={errors.bankAccount ? 'error' : ''}
              />
              {errors.bankAccount && <span className="error-message">{errors.bankAccount}</span>}
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <select
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <div className="form-group">
              <label>Government ID</label>
              <input
                type="file"
                name="governmentId"
                onChange={handleChange}
                accept="image/*,.pdf"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself and your properties..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="register-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>
);
};

export default LandlordRegister;