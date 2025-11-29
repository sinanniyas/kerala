import { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TopSpots() {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const res = await axios.get("https://kerala-i5mr.onrender.com/api/places");

        // Shuffle & pick 8 random places
        const random8 = res.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

        setSpots(random8);
      } catch (err) {
        console.error("Error fetching places", err);
      }
    };

    loadPlaces();
  }, []);

  const openPlace = (id) => {
    navigate(`/place/${id}`);
  };

  return (
    <Container className="py-5" style={{ background: "#f7fdf9" }}>
      <h2 className="text-center fw-bold mb-4">
        Let us pick for you
      </h2>

      <Row xs={1} sm={2} md={2} lg={4} className="g-4">
        {spots.map((p) => (
          <Col key={p._id}>
            <Card
              className="border-0 shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => openPlace(p._id)}
            >
              <Card.Img
                src={p.imageUrl}
                alt={p.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text className="text-muted">{p.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
