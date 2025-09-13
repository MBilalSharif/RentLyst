import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditProperty.css';
import API from '../api';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    area: '',
    image: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      const token = sessionStorage.getItem('token');
     
try {
  const res = await API.get(`/rentals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
          // Add a small delay to show the loading animation
          setTimeout(() => setLoading(false), 600);
        } else {
          alert(data.msg || 'Failed to fetch property.');
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/rentals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        // Success animation before redirect
        document.querySelector('.success-checkmark').style.display = 'block';
        setTimeout(() => {
          navigate('/landlord-dashboard');
        }, 1500);
      } else {
        alert(data.msg || 'Failed to update property.');
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-property-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="edit-property-container">
      <div className="form-card">
        <h2 className="form-title">Edit Property</h2>
        <p className="form-subtitle">Update your property details below</p>
        
        <form onSubmit={handleSubmit} className="property-form">
          <div className="input-group">
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Title" 
              required 
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>
          
          <div className="input-group">
            <textarea
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Description" 
              required 
              className="form-input textarea"
              rows="3"
            ></textarea>
            <span className="input-highlight"></span>
          </div>
          
          <div className="input-group">
            <input 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="Location" 
              required 
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>
          
          <div className="form-row">
            <div className="input-group half-width">
              <input 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="Price" 
                required 
                className="form-input"
              />
              <span className="input-highlight"></span>
              <span className="currency-symbol">$</span>
            </div>
            
            <div className="input-group half-width">
              <input 
                name="area" 
                type="number" 
                value={formData.area} 
                onChange={handleChange} 
                placeholder="Area" 
                required 
                className="form-input"
              />
              <span className="input-highlight"></span>
              <span className="area-unit">sq ft</span>
            </div>
          </div>
          
          <div className="input-group">
            <input 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="Image URL" 
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>
          
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Property preview" />
            </div>
          )}
          
          <button 
            type="submit" 
            className={`submit-btn ${submitting ? 'submitting' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Property'}
            <span className="btn-spinner"></span>
          </button>
        </form>
        
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;