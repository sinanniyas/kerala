import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Badge } from "react-bootstrap";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/places`);

        const selected = res.data.find((p) => p._id === id);

        setPlace(selected);
      } catch (error) {
        console.error("Error loading place:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="container text-center my-5">
        <h2>Place Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "1000px" }}>
      {/* Back Button */}
      <button
        className="btn btn-outline-success mb-4 mt-5"
        onClick={() => navigate(-1)}
        style={{ borderRadius: "8px" }}
      >
        ← Back
      </button>

      {/* Main Card */}
      <div
        className="card border-0 shadow"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        {/* Image */}
        <img
          src={place.imageUrl}
          alt={place.name}
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
          }}
        />

        {/* Body */}
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h1 className="fw-bold mb-0" style={{ color: "#087f5b" }}>
              {place.name}
            </h1>

            <Badge
              bg="light"
              style={{
                color: "#087f5b",
                fontSize: "0.9rem",
                border: "2px solid #087f5b",
                padding: "6px 12px",
              }}
            >
              {place.category}
            </Badge>
          </div>

          <h5 className="text-secondary">{place.district}</h5>

          <p
            className="mt-3"
            style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#495057" }}
          >
            {place.detailedDescription}
          </p>

          <div className="mt-4">
            <h5 className="fw-semibold" style={{ color: "#087f5b" }}>
              Best Time to Visit
            </h5>
            <p style={{ color: "#555", fontSize: "1rem" }}>{place.bestTime}</p>
          </div>

          {/* Map Link */}
          {place.mapLink && (
            <a
              href={place.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success px-4 py-2 mt-3"
              style={{ borderRadius: "10px" }}
            >
              View on Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
