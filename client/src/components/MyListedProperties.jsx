import React, { useEffect, useState } from 'react';
import '../styles/MyListedProperties.css';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const MyListedProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const token = sessionStorage.getItem('token');
    try {
  const res = await API.get("/rentals/my-properties", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      const data = await res.json();
      if (res.ok) setProperties(data);
      else alert(data.msg || "Error fetching listings.");
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/rentals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        alert('Property deleted successfully');
        fetchProperties(); // refresh list
      } else {
        alert(data.msg || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  return (
    <div className="my-properties">
      <h2>My Listed Properties</h2>
      {properties.length === 0 ? (
        <p>No properties listed yet.</p>
      ) : (
        <div className="property-list">
          {properties.map((prop) => (
            <div key={prop._id} className="property-card">
              {/* ✅ Handle Cloudinary images (string or array) */}
              {prop.image && prop.image.length > 0 && (
                <img
                  src={Array.isArray(prop.image) ? prop.image[0] : prop.image}
                  alt={prop.title || "Property"}
                  className="property-image"
                />
              )}

              <h3>{prop.title}</h3>
              <p>{prop.description}</p>
              <p><strong>Location:</strong> {prop.location}</p>
              <p><strong>Price:</strong> Rs. {prop.price}</p>
              <p><strong>Area:</strong> {prop.area} sqft</p>
              <div className="property-actions">
                <button onClick={() => handleEdit(prop._id)}>Edit</button>
                <button onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListedProperties;
