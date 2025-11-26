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
    <section className="py-5" style={{ background:"#F8F9FA" }}>
      <Container>
        <h2 className="text-center fw-bold">Taste Kerala</h2>
        <p className="text-center text-muted mb-5">
          If you don’t eat these — did you even come to Kerala?
        </p>

        <Row xs={1} sm={2} md={2} lg={4} className="g-4">
          {foods.map((x,i)=>(
            <Col key={i}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Img src={x.img} style={{height:"180px",objectFit:"cover"}}/>
                <Card.Body>
                  <Card.Title className="fw-bold">{x.name}</Card.Title>
                  <Card.Text className="text-muted small">{x.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
