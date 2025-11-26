import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import varkalaImg from "../images/varkala.webp";
import munnarImg from "../images/munnar.webp";
import wayanadImg from "../images/wayanad.webp";
import kochiImg from "../images/kochi.webp";
import athirapallyImg from "../images/athirapally.webp";
import ponmudiImg from "../images/ponmudi.webp";
import anamudiImg from "../images/anamudi.webp";
import vagamonImg from "../images/vagamon.webp";

const spots = [
  { name: "Varkala", desc: "Beach + cliffs + café dates", img: varkalaImg },
  { name: "Munnar", desc: "Tea hills + dreamy sunrise", img: munnarImg },
  { name: "Wayanad", desc: "Fog, forests & wild trails", img: wayanadImg },
  { name: "Fort Kochi", desc: "Art cafes + instagram lanes", img: kochiImg },

  { name: "Vagamon", desc: "Paraglide & pine forest snaps", img: vagamonImg },
  { name: "Anamudi Base", desc: "Highest peak basecamp trek", img: anamudiImg },
  { name: "Ponmudi", desc: "Crazy hairpins + hill hostels", img: ponmudiImg },
  {
    name: "Athirapally",
    desc: "Baahubali waterfalls moment",
    img: athirapallyImg,
  },
];

export default function TopSpots() {
  return (
    <Container className="py-5 " style={{ background: "#f7fdf9"  }} >

      <h2 className="text-center fw-bold mb-4">
        Where backpackers love to go in Kerala 
      </h2>

      <Row xs={1} sm={2} md={2} lg={4} className="g-4">
        {spots.map((x, i) => (
          <Col key={i}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Img
                src={x.img}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Text className="text-muted">{x.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
