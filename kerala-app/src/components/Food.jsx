import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import puttuImg from "../images/puttu.webp";
import karimeenImg from "../images/karimeen.webp";
import biriyaniImg from "../images/biriyani.webp";
import parottaImg from "../images/porotta.webp";

const foods = [
  { name:"Puttu + Kadala", desc:"Breakfast that actually slaps", img:puttuImg },
  { name:"Kerala Parotta", desc:"Layered buttery happiness", img:parottaImg },
  { name:"Thalassery Biriyani", desc:"Softer rice, less spice, more vibe", img:biriyaniImg },
  { name:"Karimeen Fry", desc:"Epic backwater fish fry", img:karimeenImg },
];

export default function LocalFood() {
  return (
    <section className="py-5" style={{ background:"#F8FAF8" }}>
      <Container>
        
        <h2 className="text-center fw-bold" style={{ fontSize:"34px" }}>
          Taste Kerala
        </h2>

        <p className="text-center text-muted mb-5" style={{ fontSize:"17px" }}>
          If you don’t eat these — did you even come to Kerala?
        </p>

        <Row xs={1} sm={2} md={2} lg={4} className="g-4">
          {foods.map((x,i)=>(
            <Col key={i}>
              <Card
                className="border-0 shadow-sm h-100"
                style={{
                  transition:"transform .3s ease, box-shadow .3s ease",
                  borderRadius: "18px",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.08)";
                }}
              >
                <Card.Img
                  src={x.img}
                  style={{
                    height:"180px",
                    objectFit:"cover",
                    borderBottom: "1px solid #eee"
                  }}
                />

                <Card.Body>
                  <Card.Title
                    className="fw-bold"
                    style={{ fontSize:"20px", color:"#1a1a1a" }}
                  >
                    {x.name}
                  </Card.Title>

                  <Card.Text
                    className="text-muted"
                    style={{ fontSize:"14px", marginTop:"5px" }}
                  >
                    {x.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
}
