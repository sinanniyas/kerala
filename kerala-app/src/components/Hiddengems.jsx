import React from "react";

import gem1 from "../images/ponmudi.webp";
import gem2 from "../images/varkala.webp";
import gem3 from "../images/kakkayam.webp";
import gem4 from "../images/kuruva.gif";
import gem5 from "../images/muzhi.webp";
import gem6 from "../images/athirapally.webp";

const gems = [
  {
    name: "Ponmudi",
    img: gem1,
    location: "Thiruvananthapuram",
    desc: "A quiet hill station with misty roads, streams, trekking spots and golden valley views."
  },
  {
    name: "Varkala Cliff",
    img: gem2,
    location: "Thiruvananthapuram",
    desc: "Cliff-side beach cafes, sunset view points, paragliding and peaceful vibe."
  },
  {
    name: "Kakkayam Dam",
    img: gem3,
    location: "Kozhikode",
    desc: "Less crowded trekking spot, lakes, waterfalls and forest trails."
  },
  {
    name: "Kuruvadweep",
    img: gem4,
    location: "Wayanad",
    desc: "Island protected forest, bamboo rafting and wildlife."
  },
  {
    name: "Muzhappilangad Drive-in Beach",
    img: gem5,
    location: "Kannur",
    desc: "India’s longest drive-in beach. Perfect for photos and evening drives."
  },
  {
    name: "Athirapally",
    img: gem6,
    location: "Thrissur",
    desc: "Kerala’s Niagara — huge waterfall and cinematic views."
  },
];

const HiddenGems = () => {
  return (
    <>
      <style>{`
        .gems-section {
          padding: 60px 20px;
          background: #f9fafb;
          text-align: center;
        }
        
        .gems-section h2 {
          font-size: 32px;
          font-weight: 700;
          color: #222;
        }
        
        .gems-subtext {
          color: #666;
          margin-bottom: 35px;
          font-size: 16px;
        }
        
        .gems-grid {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
        }
        
        .gem-card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
          transition: 0.3s ease;
          cursor: pointer;
        }
        
        .gem-card:hover {
          transform: translateY(-6px);
          box-shadow: 0px 6px 14px rgba(0,0,0,0.15);
        }
        
        .gem-card img {
          width: 100%;
          height: 170px;
          object-fit: cover;
        }
        
        .gem-content {
          padding: 15px 18px;
          text-align: left;
        }
        
        .gem-content h3 {
          font-size: 20px;
          margin-bottom: 6px;
          color: #222;
        }
        
        .gem-content span {
          font-size: 13px;
          color: #009688;
          font-weight: 600;
        }
        
        .gem-content p {
          margin: 10px 0;
          font-size: 14px;
          color: #555;
        }
        
        .explore-btn {
          margin-top: 8px;
          width: 100%;
          padding: 8px 10px;
          border: none;
          background: #009688;
          color: white;
          font-size: 14px;
          border-radius: 6px;
          transition: 0.3s;
        }
        
        .explore-btn:hover {
          background: #007d73;
        }
      `}</style>

      <div className="gems-section">
        <h2>Hidden Gems of Kerala</h2>
        <p className="gems-subtext">Unique places only locals know — explore untouched beauty.</p>

        <div className="gems-grid">
          {gems.map((gem, index) => (
            <div className="gem-card" key={index}>
              <img src={gem.img} alt={gem.name} />
              <div className="gem-content">
                <h3>{gem.name}</h3>
                <span>{gem.location}</span>
                <p>{gem.desc}</p>
                <button className="explore-btn">Explore Soon</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HiddenGems;
