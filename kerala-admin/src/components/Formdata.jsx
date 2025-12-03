import React, { useEffect, useState } from "react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Contact Messages</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px"
        }}>
          <thead>
            <tr style={{ background: "#111", color: "#fff" }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Travel Date</th>
              <th style={thStyle}>Travelers</th>
              <th style={thStyle}>Destination</th>
              <th style={thStyle}>Budget</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Newsletter</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c, idx) => (
                <tr key={c._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>{c.name}</td>
                  <td style={tdStyle}>{c.email}</td>
                  <td style={tdStyle}>{c.phone || "-"}</td>
                  <td style={tdStyle}>{c.travelDate ? new Date(c.travelDate).toLocaleDateString() : "-"}</td>
                  <td style={tdStyle}>{c.travelers || "-"}</td>
                  <td style={tdStyle}>{c.destination || "-"}</td>
                  <td style={tdStyle}>{c.budget || "-"}</td>
                  <td style={tdStyle}>{c.purpose || "-"}</td>
                  <td style={tdStyle}>{c.newsletter ? "Yes" : "No"}</td>
                  <td style={tdStyle}>{c.message}</td>
                  <td style={tdStyle}>{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                  No messages yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "14px"
};

const tdStyle = {
  padding: "10px",
  fontSize: "13px",
  verticalAlign: "top"
};
