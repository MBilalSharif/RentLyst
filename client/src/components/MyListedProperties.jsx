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
    const token = sessionStorage.getItem("token");
    try {
      const res = await API.get("/rentals/my-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Axios already parses JSON, no need for res.json()
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      alert("Error fetching listings.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    const token = sessionStorage.getItem("token");
    try {
      const res = await API.delete(`/rentals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property deleted successfully");
      fetchProperties(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
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
