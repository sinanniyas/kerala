import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const navigate = useNavigate();

  // Hardcoded categories with emojis
  const categories = [
    { emoji: "⭐", title: "All" },
    { emoji: "🏰", title: "Heritage" },
    { emoji: "🏖️", title: "Beaches" },
    { emoji: "⛰️", title: "Hill Stations" },
    { emoji: "🐾", title: "Wildlife" },
    { emoji: "🚤", title: "Backwaters" },
    { emoji: "💦", title: "Waterfalls" },
    { emoji: "🌄", title: "Scenic Spots" },
    { emoji: "🥾", title: "Trekking" },
    { emoji: "🏯", title: "Fort" },
    
  ];

  return (
    <section className="py-5" style={{ background: "#FAFAFA", minHeight: "100vh", marginTop:"50px" }}>
      <Container>
        <h2 className="text-center fw-bold mb-3">Select What Kind of Place You Want to Explore</h2>
        <p className="text-center text-muted mb-5">Click a category to explore places</p>

        <Row className="g-4" xs={2} md={4}>
          {categories.map((cat, i) => (
            <Col key={i}>
              <Card
                onClick={() => navigate(`/places/${cat.title}`)}
                className="text-center p-4 shadow-sm rounded-3 h-100"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div className="fs-1 mb-2">{cat.emoji}</div>
                <h5 className="fw-semibold">{cat.title}</h5>
                <small className="text-muted">Explore {cat.title}</small>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryFilter;
