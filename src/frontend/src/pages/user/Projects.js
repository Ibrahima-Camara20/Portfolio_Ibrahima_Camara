import React, { useState, useEffect } from "react";
import { getProjects } from "../../services/api";
import { FaCode, FaGithub, FaExternalLinkAlt, FaCalendar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Projects() {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProjects()
            .then((r) => setProjects(r.data))
            .catch(() => setError(t("projects.error")))
            .finally(() => setLoading(false));
    }, [t]);

    const locale = i18n.language === "fr" ? "fr-FR" : "en-GB";

    if (loading) return (
        <div className="pf-page pf-loading"><div className="pf-spinner" /></div>
    );

    if (error) return (
        <div className="pf-page">
            <div className="container" style={{ paddingTop: "4rem" }}>
                <div className="pf-alert pf-alert-danger">{error}</div>
            </div>
        </div>
    );

    return (
        <div className="pf-page">
            <section className="pf-section">
                <div className="container">
                    <div className="pf-section-header">
                        <span className="pf-section-tag">
                            <FaCode size={11} /> {t("nav.projects")}
                        </span>
                        <h1 className="pf-section-title">{t("projects.title")}</h1>
                    </div>

                    {projects.length === 0 ? (
                        <div className="pf-alert pf-alert-info" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
                            {t("projects.empty")}
                        </div>
                    ) : (
                        <div className="row g-4">
                            {projects.map((project) => (
                                <div key={project.id} className="col-lg-6">
                                    <div className="pf-card h-100">
                                        {/* Image / placeholder */}
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                style={{ width: "100%", height: 200, objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div style={imgPlaceholder}>
                                                <FaCode size={44} color="rgba(255,255,255,0.25)" />
                                            </div>
                                        )}

                                        <div style={{ padding: "1.5rem" }}>
                                            {/* Title + date */}
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.75rem" }}>
                                                <h4 style={{ fontSize: "1.1rem", margin: 0, color: "#0f172a" }}>
                                                    {project.title}
                                                </h4>
                                                <span style={{ color: "#94a3b8", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                                                    <FaCalendar size={10} />
                                                    {new Date(project.created_at).toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.1rem" }}>
                                                {project.description}
                                            </p>

                                            {/* Technologies */}
                                            <div style={{ marginBottom: "1.25rem" }}>
                                                <p style={techLabel}>{t("projects.technologies")}</p>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                                    {project.technologies.split(",").map((tech, i) => (
                                                        <span key={i} style={techBadge}>{tech.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Links */}
                                            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                                {project.github_link && (
                                                    <a
                                                        href={project.github_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pf-btn pf-btn-outline"
                                                        style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
                                                    >
                                                        <FaGithub size={14} /> GitHub
                                                    </a>
                                                )}
                                                {project.live_link && (
                                                    <a
                                                        href={project.live_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pf-btn pf-btn-primary"
                                                        style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
                                                    >
                                                        <FaExternalLinkAlt size={12} /> {t("projects.demo")}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

const imgPlaceholder = {
    height: 180,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const techLabel = {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "0.5rem",
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
