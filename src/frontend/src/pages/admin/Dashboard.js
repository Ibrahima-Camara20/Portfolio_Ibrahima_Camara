import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { FaCode, FaGraduationCap, FaBriefcase, FaTools, FaEnvelope } from "react-icons/fa";

const STATS_CONFIG = [
    { key: "projects",    label: "Projets",      icon: <FaCode size={16} />,         color: "#6366f1", bg: "rgba(99,102,241,0.09)",  to: "/admin/projects" },
    { key: "education",   label: "Formations",   icon: <FaGraduationCap size={16} />, color: "#8b5cf6", bg: "rgba(139,92,246,0.09)", to: "/admin/education" },
    { key: "experiences", label: "Expériences",  icon: <FaBriefcase size={16} />,     color: "#06b6d4", bg: "rgba(6,182,212,0.09)",  to: "/admin/experience" },
    { key: "skills",      label: "Compétences",  icon: <FaTools size={16} />,         color: "#10b981", bg: "rgba(16,185,129,0.09)", to: "/admin/skills" },
    { key: "contacts",    label: "Messages",     icon: <FaEnvelope size={16} />,      color: "#f59e0b", bg: "rgba(245,158,11,0.09)", to: "/admin/contacts" },
];

function Dashboard() {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            API.get("projects/"),
            API.get("education/"),
            API.get("experiences/"),
            API.get("skills/"),
            API.get("contacts/"),
        ]).then(([p, e, ex, s, c]) => {
            setCounts({
                projects:    p.data.length,
                education:   e.data.length,
                experiences: ex.data.length,
                skills:      s.data.length,
                contacts:    c.data.length,
            });
        }).catch(console.error)
          .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard</h1>
            </div>

            {/* Stats */}
            <div className="admin-stats">
                {STATS_CONFIG.map((s) => (
                    <Link key={s.key} to={s.to} className="admin-stat-card" style={{ textDecoration: "none" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {s.icon}
                        </div>
                        <div className="admin-stat-number" style={{ color: s.color }}>
                            {loading ? "—" : counts[s.key] ?? 0}
                        </div>
                        <div className="admin-stat-label">{s.label}</div>
                    </Link>
                ))}
            </div>

            {/* Welcome */}
            <div className="admin-card">
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#0f172a" }}>
                    Bienvenue 👋
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0, lineHeight: 1.6 }}>
                    Gérez votre portfolio depuis ce panneau. Utilisez le menu à gauche pour accéder aux différentes sections et mettre à jour vos informations en temps réel.
                </p>
            </div>

            {/* Quick links */}
            <div className="admin-card">
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, margin: "0 0 1rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Accès rapide
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {[
                        { to: "/admin/profile", label: "Modifier mon profil" },
                        { to: "/admin/projects", label: "Ajouter un projet" },
                        { to: "/admin/skills", label: "Gérer les compétences" },
                        { to: "/admin/contacts", label: "Voir les messages" },
                    ].map((l) => (
                        <Link key={l.to} to={l.to}
                            style={{ background: "#f1f5f9", color: "#475569", padding: "0.5rem 1rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", border: "1px solid #e2e8f0" }}>
                            {l.label} →
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
