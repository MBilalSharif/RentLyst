import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import "../styles/Auth.css";
import Navbar from "./NavBar";
import Footer from './Footer';
import API from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
  const res = await API.post("/auth/login", formData);

  if (res.status === 200) {
    const data = res.data;

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.user.role);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    // Redirect based on role
    if (data.user.role === "landlord") {
      navigate("/landlord-dashboard");
    } else {
      navigate("/");
    }
  } else {
    alert(res.data.msg || "Login failed");
  }
} catch (error) {
  console.error("Login error:", error);
  alert(error.response?.data?.msg || "Server error");
} finally {
  setIsSubmitting(false);
}
  };
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-background"></div>
        <div className="login-content">
          <div className="login-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your account</p>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <div className="input-icon">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : <>Login <ArrowRight size={18} /></>}
              </button>
            </form>
            <div className="auth-footer">
              <p>Don't have an account? <a href="/register">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
