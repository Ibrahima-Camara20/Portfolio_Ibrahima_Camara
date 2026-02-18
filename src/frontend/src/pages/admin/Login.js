import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <input
        className="form-control mb-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default Login;
