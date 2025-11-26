import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function StayTypes() {
  const list = [
    {
      name:"Hostels",
      vibe:"Best for solo & backpackers",
      price:"₹350 – ₹900 / night"
    },
    {
      name:"Homestays",
      vibe:"Local family + real Kerala culture",
      price:"₹600 – ₹2000 / night"
    },
    {
      name:"Resorts",
      vibe:"Luxury + pools + spa",
      price:"₹3500 – ₹15000 / night"
    },
    {
      name:"Houseboats",
      vibe:"Alleppey / Kumarakom backwaters",
      price:"₹4000 – ₹12000 / night"
    },
  ];

  return (
    <section className="py-5" style={{background:"#FAF9F5"}}>
      <Container>
        <h2 className="text-center fw-bold mb-3">Where To Stay?</h2>
        <p className="text-center text-muted mb-4">
          Kerala has stays for every type of traveler.
        </p>

        <Row className="g-4" xs={1} sm={2} md={4}>
          {list.map((x,i)=>(
            <Col key={i}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-center">
                <h5 className="fw-bold mb-1">{x.name}</h5>
                <small className="text-muted d-block">{x.vibe}</small>
                <div className="mt-2 fw-semibold" style={{color:"#1DB954"}}>{x.price}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
