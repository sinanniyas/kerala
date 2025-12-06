import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";


export default function NavbarTop() {
  const [hide, setHide] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  // --------------------------------------------
  // 🔥 CHECK LOGIN STATUS ON LOAD
  // --------------------------------------------


useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    setIsLoggedIn(true); // ✅ update login status
  } else {
    setIsLoggedIn(false);
  }
}, []);



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

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setIsLoggedIn(false); // ✅ reset login status
};



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

        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="basic-nav" style={{ border: "none" }} />

        <Navbar.Collapse id="basic-nav">
          <Nav className="ms-auto gap-4 align-items-center">

            <Nav.Link as={Link} to="/" style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/places" style={{ color: "white" }}>Places</Nav.Link>
            <Nav.Link as={Link} to="/catfil" style={{ color: "white" }}>Experiences</Nav.Link>

            {/* 🔥 User Icon */}
            <div ref={userDropdownRef} style={{ position: "relative" }}>
              <FaUserCircle
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  fontSize: 32,
                  cursor: "pointer",
                  color: isLoggedIn ? "#32d296" : "gray",
                }}
              />

              {showUserDropdown && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 40,
                    background: "#111",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 160,
                    border: "1px solid #32d296",
                    zIndex: 9999,
                  }}
                >
                  {!isLoggedIn ? (
                    <>
                      <div
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </div>
                      <div
                        style={{
                          color: "white",
                          marginTop: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/register")}
                      >
                        Register
                      </div>
                       <div
                        style={{
                          color: "white",
                          marginTop: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/form")}
                      >
                        Contact us
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ color: "#32d296" }}>
                        Welcome, {user?.name}
                      </div>
                      <div
                        style={{
                          color: "white",
                          marginTop: 10,
                          cursor: "pointer",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                          <div
                        style={{
                          color: "white",
                          marginTop: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/form")}
                      >
                        Contact us
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
