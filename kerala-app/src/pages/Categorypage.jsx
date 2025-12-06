import React, { useEffect, useState } from "react";
import { Card, Row, Col, Pagination, Badge, Spinner, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const PlacesByCategory = () => {
  const { category } = useParams(); // get category from URL
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || "All");

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/places`);
        setPlaces(res.data.places);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    setSelectedCategory(category || "All"); // update selected category if URL changes
    setCurrentPage(1); // reset pagination
  }, [category]);

  const categories = ["All", ...Array.from(new Set(places.map((p) => p.category).filter(Boolean)))];

  const filteredPlaces =
    selectedCategory === "All"
      ? places
      : places.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPlaces.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9f5f0 100%)", minHeight: "100vh", padding: "3rem 0", marginTop: "50px" }}>
      <div className="container">

        {/* Back Button */}
        <button
          className="btn btn-outline-success mb-4"
          onClick={() => navigate("/catfil")}
          style={{ borderRadius: "8px" }}
        >
          ← Back to Categories
        </button>

        {/* Category Selector */}
        <div className="mb-4">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              const newCat = e.target.value;
              setSelectedCategory(newCat);
              setCurrentPage(1);
              navigate(`/places/${newCat}`); // update URL
            }}
            style={{ width: "250px", fontWeight: "600" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </div>

        <h2 className="text-center fw-bold mb-4">{selectedCategory} Places</h2>

        <Row className="g-4">
          {currentItems.map((place) => (
            <Col key={place._id} lg={3} md={4} sm={6}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", backgroundColor: "#fff", transition: "all 0.3s" }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={place.imageUrl}
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.4s" }}
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
                  <Card.Title style={{ fontSize: "1.1rem", fontWeight: "700", color: "#212529", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                    {place.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.875rem", color: "#6c757d", lineHeight: "1.6" }}>
                    {place.shortDescription}
                  </Card.Text>
                </Card.Body>
                <div style={{ padding: "0 1.25rem 1.25rem", display: "flex", alignItems: "center", color: "#087f5b", fontWeight: "600" }}>
                  <Link to={`/place/${place._id}`} style={{ color: "#087f5b", fontWeight: "600", textDecoration: "none" }}>
                    Explore →
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-5">
          <Pagination style={{ gap: "6px" }}>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PlacesByCategory;
