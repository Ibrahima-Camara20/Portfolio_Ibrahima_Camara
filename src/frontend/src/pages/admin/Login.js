import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaLock, FaUser, FaExclamationCircle } from "react-icons/fa";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState(null);
    const [loading, setLoading]   = useState(false);
    const { login } = useContext(AuthContext);
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            navigate("/admin/dashboard");
        } catch {
            setError("Identifiants incorrects. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            {/* Background glow */}
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={cardStyle}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div style={logoStyle}>IC</div>
                    <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>
                        Admin Panel
                    </h1>
                    <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                        Connectez-vous pour gérer votre portfolio
                    </p>
                </div>

                {error && (
                    <div style={errorStyle}>
                        <FaExclamationCircle size={14} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={labelStyle}>
                            <FaUser size={10} /> Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            autoFocus
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "1.75rem" }}>
                        <label style={labelStyle}>
                            <FaLock size={10} /> Mot de passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={btnStyle(loading)}>
                        {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    position: "relative",
    overflow: "hidden",
};

const cardStyle = {
    background: "white",
    borderRadius: 18,
    padding: "2.5rem",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
    position: "relative",
    zIndex: 1,
};

const logoStyle = {
    width: 54,
    height: 54,
    borderRadius: 14,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
    letterSpacing: "-1px",
};

const errorStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(239,68,68,0.08)",
    color: "#ef4444",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    marginBottom: "1.25rem",
};

const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: "0.5rem",
};

const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.875rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: 9,
    fontSize: "0.95rem",
    color: "#334155",
    outline: "none",
    fontFamily: "inherit",
    background: "#f8fafc",
    display: "block",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
};

const btnStyle = (disabled) => ({
    width: "100%",
    background: disabled
        ? "#a5b4fc"
        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "0.85rem",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
});

export default Login;
