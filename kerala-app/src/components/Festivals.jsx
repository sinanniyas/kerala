import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Festivals() {
  const list = [
    {
      title:"Onam",
      when:"Aug – Sep",
      desc:"State's biggest festival. Pookalam, Sadya, Vallamkali."
    },
    {
      title:"Thrissur Pooram",
      when:"April – May",
      desc:"Temple festival with elephants + fireworks + chenda."
    },
    {
      title:"Vishu",
      when:"April",
      desc:"Malayali new year. Vishukkani, fireworks, family feast."
    },
    {
      title:"Theyyam",
      when:"Oct – May",
      desc:"North Kerala ritual art performance — very unique."
    },
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-3">Major Festivals in Kerala</h2>

        <Row className="g-4 mt-4" xs={1} sm={2} md={2} lg={4}>
          {list.map((x, i) => (
            <Col key={i}>
              <div className="p-4 bg-white shadow-sm rounded-3 h-100">
                <h5 className="fw-bold mb-1">{x.title}</h5>
                <div className="small text-success mb-2">{x.when}</div>
                <p className="text-muted small">{x.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
