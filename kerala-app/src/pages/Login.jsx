import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });

      // ✅ Save token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
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
        <h2 className="text-center mb-4" style={{ color: "#32d296" }}>Login</h2>

        <form onSubmit={submit}>
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
            Login
          </button>
        </form>

        {/* Go to homepage without login */}
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
          <span style={{ color: "white" }}>Don't have an account? </span>
          <Link to="/register" style={{ color: "#32d296", fontWeight: "bold" }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
