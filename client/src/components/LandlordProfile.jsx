import React, { useEffect, useState } from "react";
import Navbar from "./NavLandlord";
import { FaUserCircle, FaBuilding, FaIdCard, FaPencilAlt, FaSave } from "react-icons/fa";
import "../styles/LandlordProfile.css";
import API from "../api";

const LandlordProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    companyName: "",
    taxId: "",
    bankAccount: "",
    yearsExperience: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewGovId, setPreviewGovId] = useState(null);

  const token = sessionStorage.getItem("token");

  // ✅ Fetch landlord profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/landlord/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data; // ✅ axios already parses JSON

        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
          companyName: data.user.companyName || "",
          taxId: data.user.taxId || "",
          bankAccount: data.user.bankAccount || "",
          yearsExperience: data.user.yearsExperience || "",
          bio: data.user.bio || "",
        });

        if (data.user.profileImage) setPreviewImage(data.user.profileImage);
        if (data.user.governmentId) setPreviewGovId(data.user.governmentId);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, [token]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "profileImage") {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else if (e.target.name === "governmentId") {
      setGovernmentId(file);
      setPreviewGovId(URL.createObjectURL(file));
    }
  };

  // ✅ Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSend.append(key, formData[key])
      );
      if (profileImage) formDataToSend.append("profileImage", profileImage);
      if (governmentId) formDataToSend.append("governmentId", governmentId);

      const res = await API.put("/auth/landlord/profile", formDataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        alert("Profile updated successfully");
      } else {
        alert(res.data.msg || "Update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h2><FaUserCircle className="header-icon" /> Landlord Profile</h2>
            <p>Manage your account information and settings</p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            {/* Personal Info Section */}
            <div className="form-section personal-info">
              <h3><FaUserCircle /> Personal Information</h3>

              <div className="profile-image-container">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="profile-image" />
                ) : (
                  <div className="profile-image-placeholder"><FaUserCircle /></div>
                )}
                <label className="image-upload-label">
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <span className="upload-button"><FaPencilAlt /> Change Photo</span>
                </label>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" />
              </div>
            </div>

            {/* Business Info Section */}
            <div className="form-section business-info">
              <h3><FaBuilding /> Business Information</h3>

              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Tax ID</label>
                <input type="text" name="taxId" value={formData.taxId} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Bank Account</label>
                <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Years of Experience</label>
                <select name="yearsExperience" value={formData.yearsExperience} onChange={handleChange}>
                  <option value="">Select experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            {/* Verification Section */}
            <div className="form-section verification">
              <h3><FaIdCard /> Verification</h3>
              <div className="form-group">
                <label>Government ID Upload</label>
                <div className="file-upload">
                  <input type="file" name="governmentId" accept="image/*" onChange={handleFileChange} />
                  <span className="file-upload-button">Choose File</span>
                  <span className="file-name">{governmentId ? governmentId.name : (previewGovId ? "Uploaded" : "No file chosen")}</span>
                </div>
                <p className="file-upload-hint">Upload a clear photo of your government-issued ID</p>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="save-button">
                {loading ? <span className="spinner"></span> : <><FaSave /> Update Profile</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LandlordProfile;
