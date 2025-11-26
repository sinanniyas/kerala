import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function BestTime() {
  const data = [
    { label:"Peak Season", months:"Dec – Feb", color:"#1DB954" },
    { label:"Good Season", months:"Mar – May", color:"#FFD23F" },
    { label:"Monsoon", months:"Jun – Aug", color:"#FF5E5B" },
    { label:"Pleasant Again", months:"Sep – Nov", color:"#8A84E2" },
  ];

  return (
    <section className="py-5" style={{ background:"#FFF" }}>
      <Container>
        <h2 className="text-center fw-bold mb-3">Best Time To Visit Kerala</h2>
        <p className="text-center text-muted mb-5">
          Kerala is beautiful all year — but the vibe changes by season.
        </p>

        <Row className="g-4" xs={1} sm={2} md={4}>
          {data.map((x, i) => (
            <Col key={i}>
              <div className="p-3 rounded-3 shadow-sm text-center h-100">
                <div 
                  className="rounded-3 mb-3"
                  style={{background:x.color, height:"70px"}}
                />
                <h6 className="fw-bold">{x.label}</h6>
                <small className="text-muted">{x.months}</small>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
