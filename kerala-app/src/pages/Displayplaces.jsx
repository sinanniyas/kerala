import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const DisplayPlaces = () => {
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========== FETCH FROM BACKEND ==========
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/places`);
        const formatted = res.data.map((place) => ({
          id: place._id,
          title: place.name,
          description: place.shortDescription,
          image: place.imageUrl,
          category: place.category,
        }));
        setPlacesData(formatted);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // ========== PAGINATION ==========
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = placesData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(placesData.length / itemsPerPage);

  // Category colors
  const categoryColors = {
    Backwaters: "#006d77",
    Hills: "#2d6a4f",
    Beaches: "#0077b6",
    Heritage: "#9b2226",
    Wildlife: "#6a4c93",
  };

  // ========== LOADING UI ==========
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9f5f0 100%)",
        minHeight: "100vh",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #087f5b, #20c997)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              marginTop: "5rem",
            }}
          >
            God's Own Country
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#495057",
              fontWeight: "300",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Discover the enchanting beauty of Kerala's finest destinations
          </p>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #087f5b, #20c997)",
              margin: "1.5rem auto",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        {/* Cards Grid */}
        <Row className="g-4">
          {currentItems.map((place) => (
            <Col key={place.id} lg={3} md={4} sm={6}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={place.image}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <Badge
                    bg="light"
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      color: categoryColors[place.category] || "#087f5b",
                      fontWeight: "600",
                      padding: "6px 12px",
                      fontSize: "0.75rem",
                      border: `2px solid ${
                        categoryColors[place.category] || "#087f5b"
                      }`,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    {place.category}
                  </Badge>
                </div>
                <Card.Body style={{ padding: "1.25rem" }}>
                  <Card.Title
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: "#212529",
                      marginBottom: "0.75rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {place.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.875rem",
                      color: "#6c757d",
                      lineHeight: "1.6",
                    }}
                  >
                    {place.description}
                  </Card.Text>
                </Card.Body>
                <div
                  style={{
                    padding: "0 1.25rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    color: "#087f5b",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                  }}
                >
                  <Link
                    to={`/place/${place.id}`}
                    style={{
                      padding: "0 1.25rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      color: "#087f5b",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
                  >
                    Explore{" "}
                    <span style={{ marginLeft: "6px", fontSize: "1rem" }}>
                      →
                    </span>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-5">
          <Pagination style={{ gap: "6px" }}>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DisplayPlaces;
