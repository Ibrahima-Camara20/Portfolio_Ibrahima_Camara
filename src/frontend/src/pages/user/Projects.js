import React, { useState, useEffect } from "react";
import { getProjects } from "../../services/api";
import { FaCode, FaGithub, FaExternalLinkAlt, FaCalendar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";

const MAX_DESC = 200;

function Projects() {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        getProjects()
            .then((r) => setProjects(r.data))
            .catch(() => setError(t("projects.error")))
            .finally(() => setLoading(false));
    }, [t]);

    const locale = i18n.language === "fr" ? "fr-FR" : "en-GB";
    const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    if (loading) return <div className="pf-page pf-loading"><div className="pf-spinner" /></div>;

    if (error) return (
        <div className="pf-page">
            <div className="container" style={{ paddingTop: "4rem" }}>
                <div className="pf-alert pf-alert-danger">{error}</div>
            </div>
        </div>
    );

    return (
        <div className="pf-page">
            <PageHero
                icon={<FaCode size={11} />}
                tag={t("nav.projects")}
                title={t("projects.title")}
                subtitle={t("projects.subtitle")}
            />

            <section className="pf-section">
                <div className="container">
                    {projects.length > 0 && (
                        <p style={countLine}>
                            {projects.length} {t("projects.count")}
                        </p>
                    )}

                    {projects.length === 0 ? (
                        <div className="pf-alert pf-alert-info" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
                            {t("projects.empty")}
                        </div>
                    ) : (
                        <div className="row g-4">
                            {projects.map((project, idx) => {
                                const desc = project.description || "";
                                const isLong = desc.length > MAX_DESC;
                                const isExp = !!expanded[project.id];

                                return (
                                    <div key={project.id} className="col-lg-6">
                                        <div className="pf-card h-100" style={{ display: "flex", flexDirection: "column" }}>
                                            {/* Image zone */}
                                            <div style={{ position: "relative", overflow: "hidden" }}>
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }}
                                                    />
                                                ) : (
                                                    <div style={imgPlaceholder}>
                                                        <FaCode size={42} color="rgba(255,255,255,0.22)" />
                                                    </div>
                                                )}
                                                <span style={numBadge}>#{String(idx + 1).padStart(2, "0")}</span>
                                            </div>

                                            <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                                {/* Title + date */}
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.875rem" }}>
                                                    <h4 style={{ fontSize: "1.1rem", margin: 0, color: "#0f172a", fontWeight: 700 }}>
                                                        {project.title}
                                                    </h4>
                                                    <span style={datePill}>
                                                        <FaCalendar size={10} />
                                                        {new Date(project.created_at).toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                {desc && (
                                                    <div style={{ marginBottom: "1.1rem" }}>
                                                        <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 0.4rem", whiteSpace: "pre-wrap" }}>
                                                            {isExp ? desc : desc.slice(0, MAX_DESC)}
                                                            {!isExp && isLong ? "…" : ""}
                                                        </p>
                                                        {isLong && (
                                                            <button onClick={() => toggle(project.id)} style={readMoreBtn}>
                                                                {isExp
                                                                    ? <><FaChevronUp size={9} /> {t("projects.seeLess")}</>
                                                                    : <><FaChevronDown size={9} /> {t("projects.seeMore")}</>
                                                                }
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Technologies */}
                                                <div style={{ marginBottom: "1.25rem" }}>
                                                    <p style={techLabel}>{t("projects.technologies")}</p>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                                        {project.technologies.split(",").map((tech, i) => (
                                                            <span key={i} style={techBadge}>{tech.trim()}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Action links */}
                                                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "auto" }}>
                                                    {project.github_link && (
                                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                                                            className="pf-btn pf-btn-outline" style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
                                                            <FaGithub size={14} /> GitHub
                                                        </a>
                                                    )}
                                                    {project.live_link && (
                                                        <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                                                            className="pf-btn pf-btn-primary" style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
                                                            <FaExternalLinkAlt size={12} /> {t("projects.demo")}
                                                        </a>
                                                    )}
                                                </div>
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

const countLine = {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.4px",
    marginBottom: "2.5rem",
};

const imgPlaceholder = {
    height: 185,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const numBadge = {
    position: "absolute",
    top: "0.75rem",
    left: "0.75rem",
    background: "rgba(15,23,42,0.72)",
    color: "rgba(255,255,255,0.75)",
    padding: "0.2rem 0.6rem",
    borderRadius: "6px",
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "0.5px",
    backdropFilter: "blur(4px)",
};

const datePill = {
    color: "#94a3b8",
    fontSize: "0.78rem",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    whiteSpace: "nowrap",
    flexShrink: 0,
};

const readMoreBtn = {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontFamily: "inherit",
};

const techLabel = {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    margin: "0 0 0.5rem",
};

const techBadge = {
    background: "rgba(99,102,241,0.08)",
    color: "#6366f1",
    padding: "0.25rem 0.65rem",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 500,
};

export default Projects;
