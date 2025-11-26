import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function TripStyles() {
  const types = [
    { emoji:"🎒", title: "Backpacking", sub: "Cheap & Flexible" },
    { emoji:"⛰️", title: "Adventure", sub: "Trek, Climb, Camp" },
    { emoji:"🏖️", title: "Beach Chill", sub: "Hostels + Sunsets" },
    { emoji:"🍲", title: "Food Trips", sub: "Local Flavour Hunt" },
  ];

  return (
    <section className="py-5" style={{ background:"#FAFAFA" }}>
      <Container>
        <h2 className="text-center fw-bold mb-4">What's Your Style?</h2>
        <p className="text-center text-muted mb-5">Choose how you want to experience Kerala</p>

        <Row className="g-4" xs={2} md={4}>
          {types.map((t, i) => (
            <Col key={i}>
              <div className="text-center p-3 rounded-3 shadow-sm bg-white h-100">
                <div className="mb-2 fs-1">{t.emoji}</div>
                <h5 className="fw-semibold">{t.title}</h5>
                <small className="text-muted">{t.sub}</small>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
