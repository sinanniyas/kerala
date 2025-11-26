import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import trainImg from "../images/train.webp";
import ksrtcImg from "../images/ksrtc.webp";
import ferryImg from "../images/ferry.webp";

const moves = [
  {
    title: "Train",
    desc: "Best for long route. Cheap + Scenic. Always book early.",
    img: trainImg
  },
  {
    title: "KSRTC Bus",
    desc: "Red buses everywhere. Cheapest way to hop towns.",
    img: ksrtcImg
  },
  {
    title: "Backwater Ferry",
    desc: "Alappuzha & Kochi ferries are literally ₹15 boat rides.",
    img: ferryImg
  },
];

export default function TransportGuide() {
  return (
    <div style={{background:"#F7F7F7"}} className="py-5 ">
      <Container>
        <h2 className="fw-bold text-center mb-4">How To Move Around Kerala</h2>
        <p className="text-center text-muted mb-5" style={{maxWidth:"550px",margin:"0 auto"}}>
          Get around like a local — skip taxis when possible. These are the hack friendly ways.
        </p>

        <Row xs={1} md={3} className="g-4">
          {moves.map((x, i) => (
            <Col key={i}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Img src={x.img} style={{height:"200px",objectFit:"cover"}}/>
                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text className="text-muted small">{x.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
