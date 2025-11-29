import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import krl from "../images/kerala.jpg"
import prm from "../images/pooram❤️_🔥.jpg"
import vsu from "../images/Vishu Katta _ Vishukkatta.jpg"

export default function Festivals() {
  const list = [
    {
      title: "Onam",
      when: "Aug – Sep",
      desc: "Kerala's biggest cultural festival. Pookalam, Sadya, Vallamkali boat race and vibrant traditions.",
      img: krl // add your image
    },
    {
      title: "Thrissur Pooram",
      when: "April – May",
      desc: "Massive temple festival with decorated elephants, fireworks and chenda melam.",
      img: prm // add your image
    },
    {
      title: "Vishu",
      when: "April",
      desc: "Malayali New Year. Vishukkani, family feast and fireworks marking new beginnings.",
      img: vsu // add your image
    },
    {
      title: "Theyyam",
      when: "Oct – May",
      desc: "Ancient ritual performance art from North Kerala with colorful costumes and divine themes.",
      img: "https://images.pexels.com/photos/28836723/pexels-photo-28836723.jpeg?cs=srgb&dl=pexels-nandhukumar-28836723.jpg&fm=jpg" // add your image
    }
  ];

  return (
    <section className="py-5 bg-light">

       <h2 className="text-center fw-bold mb-4">Major Festivals of Kerala</h2>

      {/* TOP FULL-WIDTH CAROUSEL */}
      <Container className="mb-5">
        <Carousel controls={false} indicators={true} fade interval={3000}>
          {list.map((fest, i) => (
            <Carousel.Item key={i}>
              <div
                style={{
                  height: "55vh",
                  borderRadius: "18px",
                  overflow: "hidden"
                }}
              >
                <img
                  src={fest.img || "https://via.placeholder.com/1200x600?text=Festival+Image"}
                  alt={fest.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <Carousel.Caption>
                <h3 className="fw-bold text-shadow-lg">{fest.title}</h3>
                <p className="text-shadow-sm">{fest.desc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

    
    </section>
  );
}
