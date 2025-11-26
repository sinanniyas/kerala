import { useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";

export default function BudgetCalculator() {
  const [days, setDays] = useState(2);
  const [stay, setStay] = useState("hostel");
  const [food, setFood] = useState("budget");
  const [travel, setTravel] = useState("bus");

  const cost = {
    stay: { hostel: 600, homestay: 1200, resort: 3500 },
    food: { budget: 250, normal: 450, premium: 900 },
    travel: { bus: 100, train: 150, taxi: 900 },
  };

  const calc =
    days *
    (cost.stay[stay] + cost.food[food] + cost.travel[travel]);

  return (
    <section className="py-5" style={{ background: "#F7F7F7" }}>
      <Container>
        <h2 className="fw-bold text-center mb-3">Kerala Budget Calculator</h2>
        <p className="text-center text-muted mb-4">
          Estimate how much your trip will cost
        </p>

        <Card className="p-4 shadow-sm border-0 rounded-4" style={{ maxWidth: 700, margin: "0 auto" }}>
          <Row className="g-4">

            <Col xs={12} md={3}>
              <Form.Label>Days</Form.Label>
              <Form.Select value={days} onChange={(e) => setDays(Number(e.target.value))}>
                {[1,2,3,4,5,6,7,10].map(n => <option key={n}>{n}</option>)}
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label>Stay</Form.Label>
              <Form.Select value={stay} onChange={(e) => setStay(e.target.value)}>
                <option value="hostel">Hostel</option>
                <option value="homestay">Homestay</option>
                <option value="resort">Resort</option>
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label>Food</Form.Label>
              <Form.Select value={food} onChange={(e) => setFood(e.target.value)}>
                <option value="budget">Budget</option>
                <option value="normal">Normal</option>
                <option value="premium">Premium</option>
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label>Travel Mode</Form.Label>
              <Form.Select value={travel} onChange={(e) => setTravel(e.target.value)}>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="taxi">Taxi</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <h4 className="fw-bold">
              Estimated Total: <span style={{ color: "#1DB954" }}>₹{calc.toLocaleString()}</span>
            </h4>
            <small className="text-muted">(~ ₹{Math.round(calc / days)}/day)</small>
          </div>
        </Card>
      </Container>
    </section>
  );
}
