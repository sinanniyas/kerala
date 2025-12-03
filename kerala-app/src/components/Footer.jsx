import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background:"#111", color:"#fff" }} className="py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h4 className="fw-bold">Youth Kerala</h4>
            <p style={{opacity:.7, fontSize:"14px"}}>
              A travel guide made for the backpacker generation.
            </p>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled" style={{opacity:.7}}>
              <li>Places</li>
              <li>Experiences</li>
              <li>Food</li>
              <li>Stay</li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Connect</h6>
            <ul className="list-unstyled" style={{opacity:.7}}>
              <li>Instagram</li>
              <li>Youtube</li>
              <li>Tiktok</li>
              <li >
                <Link 
                  to="/form"
                  style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Made For</h6>
            <p style={{opacity:.7,fontSize:"14px"}}>
              Travellers who prefer local food over buffet,
              hostels over resorts, and memories over money.
            </p>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <p className="text-center small" style={{opacity:.7}}>
          © 2025 Youth Kerala. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}
