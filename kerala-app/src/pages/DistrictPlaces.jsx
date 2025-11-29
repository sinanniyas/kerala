import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Row, Col, Pagination, Badge, Spinner, Form } from "react-bootstrap";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const DistrictPlaces = () => {
  const { district } = useParams();
  const navigate = useNavigate();

  const [placesData, setPlacesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Beaches",
    "Hill Stations",
    "Backwaters",
    "Heritage",
    "Waterfalls",
    "Trekking",
    "Wildlife",
    "Scenic Spots",
    "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch data
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/places`);
        const districtFiltered = res.data.filter(
          (p) => p.district.toLowerCase() === district.toLowerCase()
        );

        const formatted = districtFiltered.map((place) => ({
          id: place._id,
          title: place.name,
          description: place.shortDescription,
          image: place.imageUrl,
          category: place.category,
        }));

        setPlacesData(formatted);
        setFilteredData(formatted);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [district]);

  // Handle category filtering
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(placesData);
    } else {
      setFilteredData(
        placesData.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory, placesData]);

  // Pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const categoryColors = {
    Backwaters: "#006d77",
    Hills: "#2d6a4f",
    Beaches: "#0077b6",
    Heritage: "#9b2226",
    Wildlife: "#6a4c93",
    Waterfalls: "#00b4d8",
    Trekking: "#40916c",
    "Hill Stations": "#2a9d8f",
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
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
        {/* Back Button */}
        <button
          className="btn btn-outline-success mb-4"
          onClick={() => navigate(-1)}
          style={{ borderRadius: "8px", marginTop: "5rem" }}
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #087f5b, #20c997)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
            }}
          >
            Explore {district}
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#495057" }}>
            Discover the best attractions in {district}
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

        {/* Category Filter */}
        <div className="d-flex justify-content-start mb-4">
          <Form.Select
            style={{ width: "250px", fontWeight: "600" }}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Cards */}
        <Row className="g-4">
          {currentItems.map((place) => (
            <Col key={place.id} lg={3} md={4} sm={6}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
                onClick={() => navigate(`/place/${place.id}`)}
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
                      border: `2px solid ${categoryColors[place.category] || "#087f5b"}`,
                      backgroundColor: "rgba(255,255,255,0.95)",
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
                  Explore{" "}
                  <span style={{ marginLeft: "6px", fontSize: "1rem" }}>→</span>
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
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DistrictPlaces;
