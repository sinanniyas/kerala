import React, { useState } from 'react';
import { districts, categories } from '../data/sampleData';

const CLOUD_NAME = "dy23i7wvr"; // ⚠️ Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "sinankerala"; // ⚠️ Replace with your upload preset

const AddPlaceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    category: '',
    mapLink: '',
    shortDescription: '',
    detailedDescription: '',
    bestTime: '',
    imageUrl: ''
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });
      const result = await res.json();

      setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
      setUploading(false);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Try again.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const res = await fetch("http://localhost:5000/api/places", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();

  if (res.ok) {
    alert("✅ Tourist place added successfully!");
    console.log("Saved place:", data.place);
  } else {
    alert("❌ Failed to add place: " + data.message);
  }
} catch (error) {
  console.error("Error submitting form:", error);
  alert("Server error, please check console.");
}

    // Reset
    setFormData({
      name: '',
      district: '',
      category: '',
      mapLink: '',
      shortDescription: '',
      detailedDescription: '',
      bestTime: '',
      imageUrl: ''
    });
    e.target.reset();
  };

  return (
    <div>
      <h2 className="page-title">Add New Tourist Place</h2>

      <div className="card">
        <div className="form-container">
          <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><strong>Place Name</strong></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter place name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"><strong>District</strong></label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><strong>Category</strong></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label"><strong>Google Map Link</strong></label>
                <input
                  type="url"
                  name="mapLink"
                  value={formData.mapLink}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/?q=..."
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><strong>Best Time to Visit</strong></label>
                <select
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Season</option>
                  <option value="Peak Season (Dec – Feb)">Peak Season (Dec – Feb)</option>
                  <option value="Good Season (Mar – May)">Good Season (Mar – May)</option>
                  <option value="Monsoon (Jun – Aug)">Monsoon (Jun – Aug)</option>
                  <option value="Pleasant Again (Sep – Nov)">Pleasant Again (Sep – Nov)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><strong>Short Description</strong></label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description (1-2 lines)"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label"><strong>Detailed Description</strong></label>
              <textarea
                rows="5"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                placeholder="Detailed description about the place, attractions, best time to visit, etc."
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label"><strong>Upload Image</strong></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-input"
              />
              {uploading && <p>Uploading image...</p>}
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }}
                />
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-success btn-lg" disabled={uploading}>
                Add Tourist Place
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => setFormData({
                  name: '',
                  district: '',
                  category: '',
                  mapLink: '',
                  shortDescription: '',
                  detailedDescription: '',
                  bestTime: '',
                  imageUrl: ''
                })}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlaceForm;
