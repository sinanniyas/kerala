import { Container, Button } from "react-bootstrap";

export default function Hero() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.45)",
        }}
      />

      {/* content */}
      <Container
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1 style={{ fontSize: "60px", fontWeight: "bold", color: "white", lineHeight: "1.1" }}>
            Explore Kerala Your Way
          </h1>

          <p style={{ fontSize: "22px", fontWeight: 400, color: "rgba(255,255,255,.9)", marginTop: "20px" }}>
           Hostels, cliff cafés, local buses, hidden beaches, and everything the tourism sites never show.
          </p>

          <Button
            size="lg"
            style={{
              marginTop: "40px",
              padding: "14px 40px",
              borderRadius: "14px",
              fontSize: "18px",
              background: "rgba(255,255,255,.25)",
              border: "1px solid rgba(255,255,255,.5)",
              backdropFilter: "blur(10px)",
            }}
          >
           Start Backpacking
          </Button>
        </div>
      </Container>
    </div>
  );
}
