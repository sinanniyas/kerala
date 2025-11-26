import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import tvmImg from "../images/tvm.webp";
import kolImg from "../images/klm.webp";
import ptaImg from "../images/patm.webp";
import alaImg from "../images/alp.webp";
import ktymImg from "../images/ktm.webp";
import idukkiImg from "../images/idk.webp";
import ekmImg from "../images/ekm.webp";
import tsrImg from "../images/trsr.webp";
import pkdImg from "../images/pkd.webp";
import mlpmImg from "../images/mlp.webp";
import cltImg from "../images/clt.webp";
import wydImg from "../images/wnd.webp";
import knrImg from "../images/knr.webp";
import kgdImg from "../images/ksd.webp";

const districts = [
  {
    name: "Thiruvananthapuram",
    img: tvmImg,
    desc: "Beaches, temples, and the capital vibe",
  },
  {
    name: "Kollam",
    img: kolImg,
    desc: "Backwaters, cashew capital, Ashtamudi Lake",
  },
  {
    name: "Pathanamthitta",
    img: ptaImg,
    desc: "Forests, Sabarimala, waterfalls",
  },
  {
    name: "Alappuzha",
    img: alaImg,
    desc: "Houseboats, canals, Venice of the East",
  },
  {
    name: "Kottayam",
    img: ktymImg,
    desc: "Backwaters, rubber estates, Kumarakom",
  },
  { name: "Idukki", img: idukkiImg, desc: "Hill stations, wildlife, dams" },
  { name: "Ernakulam", img: ekmImg, desc: "Kochi city, tech hub, nightlife" },
  { name: "Thrissur", img: tsrImg, desc: "Pooram festival, heritage, temples" },
  {
    name: "Palakkad",
    img: pkdImg,
    desc: "Windmills, paddy fields, silent valley",
  },
  { name: "Malappuram", img: mlpmImg, desc: "Nature spots, football culture" },
  {
    name: "Kozhikode",
    img: cltImg,
    desc: "Beaches, Biriyani capital, history",
  },
  { name: "Wayanad", img: wydImg, desc: "Hill stations, camping, wildlife" },
  { name: "Kannur", img: knrImg, desc: "Theyya, beaches, forts" },
  {
    name: "Kasaragod",
    img: kgdImg,
    desc: "Bekal fort, beaches, unique culture",
  },
];

export default function DistrictSelector() {
  return (
    <section className="py-5" style={{ background: "#FAFAFA" }}>
      <Container>
        <h2 className="fw-bold text-center mb-3">Explore Kerala by District</h2>
        <p className="text-center text-muted mb-4">
          Select a district to discover places, food, activities & hidden gems
        </p>

        {/* ✅ CSS INSIDE COMPONENT */}
        <style>
          {`
            .district-card {
              position: relative;
              overflow: hidden;
              height: 180px;
              border-radius: 12px;
              cursor: pointer;
              transition: 0.3s;
            }

            .district-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: 0.4s;
            }

            .district-card:hover img {
              transform: scale(1.1);
              filter: brightness(70%);
            }

            .district-overlay {
              position: absolute;
              bottom: 12px;
              left: 12px;
              color: #fff;
              text-shadow: 0 2px 8px rgba(0,0,0,0.8);
            }

            .district-overlay h5 {
              margin: 0;
              font-size: 1rem;
              font-weight: bold;
            }

            .district-overlay p {
              font-size: 0.8rem;
              opacity: 0.85;
              margin: 0;
            }
          `}
        </style>

        <Row className="g-4">
          {districts.map((d, i) => (
            <Col xs={6} md={4} lg={3} key={i}>
              <Link
                to={`/district/${d.name}`}
                style={{ textDecoration: "none" }}
              >
                <div className="district-card">
                  <img src={d.img} alt={d.name} />
                  <div className="district-overlay">
                    <h5>{d.name}</h5>
                    <p>{d.desc}</p>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
