import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Home, ArrowRight } from 'lucide-react';
import '../styles/Auth.css';
import Navbar from './NavBar';
import Footer from './Footer';
import API from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'renter',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  

try {
  const res = await API.post("/auth/register", formData);

  if (res.status === 200) {
    alert("Registration successful!");
    localStorage.setItem("token", res.data.token);
    navigate("/"); // Redirect after successful registration
  } else {
    alert(res.data.msg || "Registration failed");
  }
} catch (error) {
  console.error(error);
  alert(error.response?.data?.msg || "Error connecting to server");
} finally {
  setIsSubmitting(false);
}
  };


  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="login-container">
        <div className="login-background"></div>
        
        <div className="login-content">
          

          <div className="login-card">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Join thousands of happy renters and landlords</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <div className="input-icon">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <div className="input-icon">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* <div className="input-group">
                <select 
                  name="role" 
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="buyer">I'm looking to rent</option>
                  <option value="seller">I'm a property owner</option>
                </select>
              </div> */}
              
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating account..."
                ) : (
                  <>
                    Register <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <a href="/login">Sign in</a></p>
              <p>Want to join as Landlord? <a href="landlord-register">Register Now</a> </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;