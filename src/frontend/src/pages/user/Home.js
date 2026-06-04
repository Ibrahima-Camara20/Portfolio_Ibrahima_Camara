import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaCode, FaGraduationCap, FaBriefcase, FaIdCard,
    FaArrowRight, FaMapMarkerAlt
} from "react-icons/fa";
import API, { getSkills } from "../../services/api";
import { useTranslation } from "react-i18next";

const CATEGORY_COLORS = {
    languages:      { color: "#6366f1", bg: "rgba(99,102,241,0.09)" },
    langues:        { color: "#334155", bg: "rgba(51,65,85,0.08)" },
    methodes:       { color: "#64748b", bg: "rgba(100,116,139,0.09)" },
    ai_ml:          { color: "#10b981", bg: "rgba(16,185,129,0.09)" },
    web_frameworks: { color: "#06b6d4", bg: "rgba(6,182,212,0.09)" },
    databases:      { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    tools_devops:   { color: "#ef4444", bg: "rgba(239,68,68,0.09)" },
};

function Home() {
    const { t } = useTranslation();
    const [skills, setSkills]   = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getSkills(),
            API.get("personal-info/"),
        ]).then(([skillsRes, profileRes]) => {
            setSkills(skillsRes.data);
            if (profileRes.data.length > 0) setProfile(profileRes.data[0]);
        }).catch(console.error)
          .finally(() => setLoading(false));
    }, []);

    const groupedSkills = React.useMemo(() => {
        const grouped = {};
        skills.forEach((skill) => {
            if (!grouped[skill.category]) {
                grouped[skill.category] = { name: skill.category_display, skills: [] };
            }
            grouped[skill.category].skills.push(skill.name);
        });
        return grouped;
    }, [skills]);

    const features = [
        {
            icon: <FaCode size={22} />,
            title: t("home.projects"),
            desc: t("home.projectsDesc"),
            link: "/projects",
            color: "#6366f1",
            bg: "rgba(99,102,241,0.07)",
        },
        {
            icon: <FaGraduationCap size={22} />,
            title: t("home.diploma"),
            desc: t("home.diplomaDesc"),
            link: "/education",
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.07)",
        },
        {
            icon: <FaBriefcase size={22} />,
            title: t("home.experience"),
            desc: t("home.experienceDesc"),
            link: "/experience",
            color: "#06b6d4",
            bg: "rgba(6,182,212,0.07)",
        },
        {
            icon: <FaIdCard size={22} />,
            title: t("home.cv"),
            desc: t("home.cvDesc"),
            link: "/mes-contacts",
            color: "#10b981",
            bg: "rgba(16,185,129,0.07)",
        },
    ];

    return (
        <div className="pf-page">
            {/* ── Hero ──────────────────────────────── */}
            <section style={heroStyle}>
                {/* Ambient glows */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    <div style={glow("#6366f1", "18%", "60%", 420)} />
                    <div style={glow("#8b5cf6", "65%", "5%",  300)} />
                </div>

                <div className="container hero-container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            {/* Location pill */}
                            {profile?.location && (
                                <div className="hero-pill">
                                    <FaMapMarkerAlt size={11} />
                                    {profile.location}
                                </div>
                            )}

                            {/* Name */}
                            <h1 style={heroH1}>
                                {t("home.welcome")}<br />
                                <span className="pf-gradient">{profile?.full_name || "Ibrahima Camara"}</span>
                            </h1>

                            {/* Subtitle */}
                            <p style={heroSubtitle}>{profile?.subtitle || t("home.subtitle")}</p>

                            {/* Description */}
                            <p style={heroDesc}>{profile?.bio || t("home.description")}</p>

                            {/* CTAs */}
                            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <Link to="/projects" className="pf-btn pf-btn-primary">
                                    {t("home.projects")} <FaArrowRight size={13} />
                                </Link>
                                <Link to="/contact" className="pf-btn" style={ctaOutlineStyle}>
                                    {t("nav.contact")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ──────────────────────────── */}
            <section className="pf-section-alt">
                <div className="container">
                    <div className="pf-section-header">
                        <span className="pf-section-tag">Portfolio</span>
                        <h2 className="pf-section-title">Ce que vous trouverez ici</h2>
                    </div>
                    <div className="row g-4">
                        {features.map((f, i) => (
                            <div key={i} className="col-sm-6 col-lg-3">
                                <Link to={f.link} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                                    <div className="pf-card h-100" style={{ padding: "1.75rem" }}>
                                        <div style={iconBox(f.bg, f.color)}>{f.icon}</div>
                                        <h4 style={{ fontSize: "1.05rem", margin: "0 0 0.4rem", color: "#0f172a" }}>
                                            {f.title}
                                        </h4>
                                        <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                                            {f.desc}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Skills ────────────────────────────── */}
            <section className="pf-section">
                <div className="container">
                    <div className="pf-section-header">
                        <span className="pf-section-tag">Stack</span>
                        <h2 className="pf-section-title">{t("home.technologiesTitle")}</h2>
                    </div>

                    {loading ? (
                        <div className="pf-loading"><div className="pf-spinner" /></div>
                    ) : (
                        <div className="row g-4">
                            {Object.entries(groupedSkills).map(([category, data]) => {
                                const cfg = CATEGORY_COLORS[category] || CATEGORY_COLORS.languages;
                                return (
                                    <div key={category} className="col-md-6 col-lg-4">
                                        <div className="pf-card h-100" style={{ padding: "1.5rem" }}>
                                            <h6 style={{
                                                color: cfg.color,
                                                fontSize: "0.75rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "1px",
                                                marginBottom: "1rem",
                                            }}>
                                                {data.name}
                                            </h6>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                                                {data.skills.map((tech, j) => (
                                                    <span key={j} style={{
                                                        background: cfg.bg,
                                                        color: cfg.color,
                                                        padding: "0.28rem 0.7rem",
                                                        borderRadius: "20px",
                                                        fontSize: "0.8rem",
                                                        fontWeight: 500,
                                                    }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

/* ─── Style helpers ────────────────────────────── */
const heroStyle = {
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
};

const glow = (color, top, left, size) => ({
    position: "absolute",
    top, left,
    width: size, height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
    transform: "translate(-50%, -50%)",
});


const heroH1 = {
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
    fontWeight: 900,
    color: "white",
    lineHeight: 1.1,
    marginBottom: "0.75rem",
};

const heroSubtitle = {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#a78bfa",
    marginBottom: "1rem",
    letterSpacing: "0.3px",
};

const heroDesc = {
    color: "#94a3b8",
    fontSize: "1rem",
    lineHeight: 1.75,
    maxWidth: "560px",
    marginBottom: "2.25rem",
};

const ctaOutlineStyle = {
    border: "2px solid rgba(167,139,250,0.35)",
    color: "#a78bfa",
    background: "transparent",
};

const iconBox = (bg, color) => ({
    width: 50,
    height: 50,
    borderRadius: 13,
    background: bg,
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.25rem",
});

export default Home;
