import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/auth/register`, { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #32d296, #1c1c1c)",
      }}
    >
      <div
        className="p-4"
        style={{
          width: 350,
          background: "#111",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#32d296" }}>Register</h2>

        <form onSubmit={submit}>
          <label style={{ color: "white", fontWeight: 500, marginBottom: 4 }}>Name</label>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              borderRadius: 8,
              border: "1px solid #32d296",
              padding: "10px",
              background: "#222",
              color: "white",
            }}
          />

          <label style={{ color: "white", fontWeight: 500, marginBottom: 4 }}>Email</label>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: 8,
              border: "1px solid #32d296",
              padding: "10px",
              background: "#222",
              color: "white",
            }}
          />

          <label style={{ color: "white", fontWeight: 500, marginBottom: 4 }}>Password</label>
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: 8,
              border: "1px solid #32d296",
              padding: "10px",
              background: "#222",
              color: "white",
            }}
          />

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#32d296",
              border: "none",
              borderRadius: 8,
              padding: "10px",
              fontWeight: 600,
            }}
          >
            Register
          </button>
        </form>
         <button
          onClick={() => navigate("/")}
          className="btn w-100 mb-3"
          style={{
            backgroundColor: "#555",
            border: "none",
            borderRadius: 8,
            padding: "10px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Continue as Guest
        </button>

        <div className="text-center">
          <span style={{ color: "white" }}>Already have an account? </span>
          <Link to="/login" style={{ color: "#32d296", fontWeight: "bold" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
