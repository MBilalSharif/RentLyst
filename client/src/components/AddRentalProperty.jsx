import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddRentalProperty.css";
import Navbar from "./NavLandlord";
import API from "../api";

const AddRentalProperty = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [images, setImages] = useState([]); // State for multiple images
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("area", area);

      // ✅ Append all images
      images.forEach((img) => formData.append("image", img));

      const res = await API.post("/rentals", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

console.log("Property added:", res.data);

      // Reset form
      setTitle("");
      setLocation("");
      setPrice("");
      setDescription("");
      setArea("");
      setImages([]);

      // ✅ Redirect back to dashboard with success message
      navigate("/landlord-dashboard", { state: { message: "Property added" } });
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-property-page">
        <div className="add-property-container">
          <div className="form-header">
            <h2>Add Rental Property</h2>
            <p>Fill in the details of your property</p>
          </div>

          <form className="property-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Property Title</label>
              <input
                id="title"
                type="text"
                placeholder="Beautiful 3-bedroom apartment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="City, Neighborhood"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  type="number"
                  placeholder="1500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="area">Area (sqft)</label>
                <input
                  id="area"
                  type="text"
                  placeholder="1200"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Describe your property..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="propertyImages">Property Images</label>
              <div className="file-upload-wrapper">
                <label
                  htmlFor="propertyImages"
                  className="file-upload-label"
                  style={{ cursor: "pointer" }}
                >
                  {images.length > 0
                    ? images.map((img) => img.name).join(", ")
                    : "Click to upload images"}
                  <input
                    type="file"
                    id="propertyImages"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => setImages(Array.from(e.target.files))}
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Add Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRentalProperty;
