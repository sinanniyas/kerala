import React, { useState } from "react";

export default function Contactform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travelers: "",
    destination: "",
    budget: "",
    purpose: "",
    newsletter: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelDate: "",
          travelers: "",
          destination: "",
          budget: "",
          purpose: "",
          newsletter: false,
          message: "",
        });
      } else {
        alert(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error(error);
      alert("Server error, try again later");
    }
  };

  return (
    <div style={{ background: "#f6f6f6", minHeight: "100vh", padding: "60px 0", marginTop: "50px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
        <form
          style={{ background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          onSubmit={handleSubmit}
        >
          {/* Name & Email */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>

          {/* Phone & Travel Date */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input type="tel" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange}
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange}
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>

          {/* Travelers & Destination */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input type="number" name="travelers" placeholder="Number of Travelers" value={formData.travelers} onChange={handleChange}
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <input type="text" name="destination" placeholder="Preferred Destination" value={formData.destination} onChange={handleChange}
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>

          {/* Budget & Purpose */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input type="text" name="budget" placeholder="Budget (Optional)" value={formData.budget} onChange={handleChange}
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <select name="purpose" value={formData.purpose} onChange={handleChange} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="">Select Purpose</option>
              <option value="Leisure">Leisure</option>
              <option value="Adventure">Adventure</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Newsletter */}
          <div style={{ marginBottom: "15px" }}>
            <label>
              <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> Subscribe to newsletter
            </label>
          </div>

          {/* Message */}
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required
            rows={4} style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />

          <button type="submit"
            style={{ width: "100%", padding: "12px", background: "#111", color: "#fff", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
