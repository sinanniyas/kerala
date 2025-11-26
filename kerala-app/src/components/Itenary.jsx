import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

export default function Plans() {
  return (
    <section className="py-5" style={{ background:"#f8f9fa" }}>
      <Container>
        <h2 className="text-center fw-bold mb-3">Ready-Made Backpacker Plans</h2>
        <p className="text-center text-muted mb-4">
          Short, cheap itineraries for fast travellers.
        </p>

        <div className="p-3 bg-white rounded-4 shadow-sm">
          <Tabs defaultActiveKey="2day" className="mb-3 justify-content-center">
            
            <Tab eventKey="2day" title="2 Days – Kochi">
              <ul className="mt-3">
                <li>Day 1 – Fort Kochi, street art, sunset beach</li>
                <li>Day 2 – Mattancherry, cheap ferry, seaside cafés</li>
              </ul>
              <small className="text-muted">avg budget: ₹700/day</small>
            </Tab>

            <Tab eventKey="3day" title="3 Days – Munnar">
              <ul className="mt-3">
                <li>Day 1 – Bus to Munnar + hostel</li>
                <li>Day 2 – Sunrise Top Station trek</li>
                <li>Day 3 – Tea museum + local snacks</li>
              </ul>
              <small className="text-muted">avg budget: ₹900/day</small>
            </Tab>

            <Tab eventKey="4day" title="4 Days – Kerala Mix">
              <ul className="mt-3">
                <li>Day 1 – Kochi old town</li>
                <li>Day 2 – Alappuzha ₹50 boat</li>
                <li>Day 3 – Train to Varkala + sunset cliff</li>
                <li>Day 4 – Surf or kayak morning</li>
              </ul>
              <small className="text-muted">avg budget: ₹900/day</small>
            </Tab>

            <Tab eventKey="beach" title="Beach Trip – 3 Days">
              <ul className="mt-3">
                <li>Day 1 – Varkala cliff hangout</li>
                <li>Day 2 – Anjengo Fort + Kappil Lake</li>
                <li>Day 3 – Kovalam morning swim</li>
              </ul>
              <small className="text-muted">avg budget: ₹800/day</small>
            </Tab>

            <Tab eventKey="nature" title="Nature Trip – 3 Days">
              <ul className="mt-3">
                <li>Day 1 – Wayanad + caves</li>
                <li>Day 2 – Chembra Peak Sunny Trek</li>
                <li>Day 3 – Sunrise viewpoint + return</li>
              </ul>
              <small className="text-muted">avg budget: ₹950/day</small>
            </Tab>

          </Tabs>
        </div>
      </Container>
    </section>
  );
}
