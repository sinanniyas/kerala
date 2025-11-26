import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function NavbarTop() {
  const [hide, setHide] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const districts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
    "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
    "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
  ];

  // Hide navbar on scroll
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const cur = window.scrollY;
      setHide(cur > last && cur > 60);
      last = cur;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to selected district
  const handleDistrictSelect = (name) => {
    navigate(`/district/${name.toLowerCase()}`);
    setShowDropdown(false);
    setSearch("");
    setExpanded(false);
  };

  const filteredList = search.trim() === ""
    ? districts
    : districts.filter(d => d.toLowerCase().includes(search.toLowerCase()));

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`shadow-sm px-3 ${hide ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor: "black",
        transition: "transform .4s ease",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Container className="d-flex align-items-center justify-content-between">

        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => setExpanded(false)}
          style={{ color: "#32d296", fontWeight: 900, fontSize: 28 }}
        >
          Discover <span style={{ color: "white" }}>Kerala</span>
        </Navbar.Brand>

        {/* Search Bar in Center */}
        <div
          ref={dropdownRef}
          style={{ position: "relative", flex: 1, maxWidth: 350, margin: "0 30px" }}
          onMouseEnter={() => setShowDropdown(true)}
        >
          <Form.Control
            type="text"
            placeholder="Search districts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setShowDropdown(true)}
            className="search-input"
            style={{
              paddingLeft: "35px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid #32d296",
              color: "white",
            }}
          />
          <FiSearch
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              color: "white",
              fontSize: 18,
            }}
          />

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "38px",
                width: "100%",
                background: "#111",
                border: "1px solid #32d296",
                borderRadius: 6,
                zIndex: 2000,
                maxHeight: 250,
                overflowY: "auto",
              }}
            >
              {filteredList.length === 0 ? (
                <div className="p-2 text-white text-center">No districts</div>
              ) : (
                filteredList.map(d => (
                  <div
                    key={d}
                    className="p-2 text-white"
                    style={{ cursor: "pointer", transition: "0.2s" }}
                    onClick={() => handleDistrictSelect(d)}
                    onMouseEnter={e => e.currentTarget.style.background = "#32d29633"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {d}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Navbar Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-nav" style={{ border: "none" }} />

        {/* Links */}
        <Navbar.Collapse id="basic-nav">
          <Nav className="ms-auto gap-3 align-items-center">
            <Nav.Link as={Link} to="/" style={{ color: "white" }} onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/places" style={{ color: "white" }} onClick={() => setExpanded(false)}>Places</Nav.Link>
            <Nav.Link as={Link} to="/exp" style={{ color: "white" }} onClick={() => setExpanded(false)}>Experiences</Nav.Link>
            <Nav.Link as={Link} to="/plan" style={{ color: "white" }} onClick={() => setExpanded(false)}>Plan Trip</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>

      {/* White placeholder CSS */}
      <style>
        {`
          .search-input::placeholder {
            color: white;
            opacity: 1;
          }
        `}
      </style>
    </Navbar>
  );
}
