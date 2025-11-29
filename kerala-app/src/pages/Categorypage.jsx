import React, { useEffect, useState, useMemo } from "react";
import { Card, Row, Col, Pagination, Badge, Spinner, Form } from "react-bootstrap";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const PlacesByCategory = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination state
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all places once
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/places`);
        setPlaces(res.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  

  // Derive unique categories from fetched data
  const categories = useMemo(() => {
    const cats = places.map((p) => p.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [places]);

  // Filtered data based on selected category
  const filteredPlaces = useMemo(() => {
    if (selectedCategory === "All") return places;
    return places.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [places, selectedCategory]);

  // Pagination for filtered results
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPlaces.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  const categoryColors = {
    Backwaters: "#006d77",
    Hills: "#2d6a4f",
    Beaches: "#0077b6",
    Heritage: "#9b2226",
    Wildlife: "#6a4c93",
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9f5f0 100%)", minHeight: "100vh", padding: "3rem 0" }}>
      <div className="container">

        {/* Category Filter UI */}
        <div className="mb-4">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // reset to first page on category change
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </div>

        {/* Cards */}
        <Row className="g-4">
          {currentItems.map((place) => (
            <Col key={place._id} lg={3} md={4} sm={6}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{ borderRadius: "16px", overflow: "hidden", transition: "all 0.3s ease", cursor: "pointer", backgroundColor: "#fff" }}
                // optional: onClick to navigate somewhere
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={place.imageUrl}
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.4s ease" }}
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
                      backgroundColor: "rgba(255,255,255,0.95)"
                    }}
                  >
                    {place.category}
                  </Badge>
                </div>
                <Card.Body style={{ padding: "1.25rem" }}>
                  <Card.Title style={{ fontSize: "1.1rem", fontWeight: "700", color: "#212529", marginBottom: "0.75rem" }}>
                    {place.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.875rem", color: "#6c757d", lineHeight: "1.6" }}>
                    {place.shortDescription}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesByCategory;
