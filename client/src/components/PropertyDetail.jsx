import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/PropertyDetails.css";
import API from "../api";


const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await API.get(`/rentals/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % property.image.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.image.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading property details...</p>
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <p>{error || "Property not found."}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="property-detail-page">
        <div className="property-header">
          <h1>{property.title}</h1>
          <p className="price">Rs. {property.price}</p>
        </div>

        <div className="property-images">
          {property.image && property.image.length > 0 ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="carousel-arrow carousel-arrow-left"
                  >
                    ‹
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="carousel-arrow carousel-arrow-right"
                  >
                    ›
                  </button>
                )
              }
            >
              {property.image.map((img, idx) => (
                <div key={idx} onClick={() => openLightbox(idx)} className="carousel-image-container">
                  <img src={img} alt={`Property ${idx}`} className="clickable-image" />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="property-info">
          <h2>Details</h2>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Area:</strong> {property.area} sq.ft</p>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>Posted On:</strong> {new Date(property.availableFrom).toLocaleDateString()}</p>
        </div>

        {property.createdBy && (
          <div className="landlord-info">
            <h2>Landlord Information</h2>
            <p><strong>Name:</strong> {property.createdBy.name}</p>
            <p><strong>Email:</strong> {property.createdBy.email}</p>
            <p><strong>Phone:</strong> {property.createdBy.phone}</p>
          </div>
        )}

        {lightboxOpen && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>
                &times;
              </button>
              <button className="lightbox-nav lightbox-prev" onClick={goToPrevImage}>
                ‹
              </button>
              <img 
                src={property.image[currentImageIndex]} 
                alt={`Property ${currentImageIndex}`} 
                className="lightbox-image"
              />
              <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetail;