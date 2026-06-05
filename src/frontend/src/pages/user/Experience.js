import React, { useState, useEffect } from "react";
import { getExperiences } from "../../services/api";
import { FaBriefcase, FaMapMarkerAlt, FaTag, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";

const CATEGORY_CFG = {
    student_job: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)",   dot: "#06b6d4" },
    internship:  { color: "#10b981", bg: "rgba(16,185,129,0.1)",  dot: "#10b981" },
    permanent:   { color: "#6366f1", bg: "rgba(99,102,241,0.1)",  dot: "#6366f1" },
    temporary:   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  dot: "#f59e0b" },
    freelance:   { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  dot: "#8b5cf6" },
};

function Experience() {
    const { t, i18n } = useTranslation();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getExperiences()
            .then((r) => setExperiences(r.data))
            .catch(() => setError(t("experience.error")))
            .finally(() => setLoading(false));
    }, [t]);

    const locale = i18n.language === "fr" ? "fr-FR" : "en-GB";
    const fmt = (d) => new Date(d).toLocaleDateString(locale, { month: "short", year: "numeric" });

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
                icon={<FaBriefcase size={11} />}
                tag={t("nav.experience")}
                title={t("experience.title")}
            />

            <section className="pf-section">
                <div className="container">
                    {experiences.length === 0 ? (
                        <div className="pf-alert pf-alert-info" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
                            {t("experience.empty")}
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                <div className="pf-timeline">
                                    {experiences.map((exp) => {
                                        const cfg = CATEGORY_CFG[exp.category] || CATEGORY_CFG.permanent;
                                        return (
                                            <div key={exp.id} className="pf-timeline-item">
                                                <div
                                                    className="pf-timeline-dot"
                                                    style={{ background: cfg.dot, boxShadow: `0 0 0 3px ${cfg.bg}` }}
                                                />
                                                <div
                                                    className="pf-card"
                                                    style={{
                                                        padding: "1.75rem",
                                                        marginLeft: "1.25rem",
                                                        borderLeft: `3px solid ${cfg.dot}`,
                                                    }}
                                                >
                                                    {/* Top row */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.875rem" }}>
                                                        <div>
                                                            <h4 style={{ fontSize: "1.1rem", margin: "0 0 0.2rem", color: "#0f172a", fontWeight: 700 }}>
                                                                {exp.title}
                                                            </h4>
                                                            <p style={{ margin: 0, fontWeight: 600, color: "#334155", fontSize: "0.9rem" }}>
                                                                {exp.company}
                                                            </p>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" }}>
                                                            {exp.is_current && (
                                                                <span className="pf-badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                                                                    ● {t("experience.current")}
                                                                </span>
                                                            )}
                                                            <span className="pf-badge" style={{ background: cfg.bg, color: cfg.color }}>
                                                                <FaTag size={9} />
                                                                {exp.category_display}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Meta */}
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", color: "#64748b", fontSize: "0.85rem", marginBottom: exp.description ? "1rem" : 0 }}>
                                                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                                            <FaMapMarkerAlt size={11} /> {exp.location}
                                                        </span>
                                                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                                            <FaClock size={11} />
                                                            {fmt(exp.start_date)} — {exp.end_date ? fmt(exp.end_date) : t("experience.today")}
                                                        </span>
                                                    </div>

                                                    {/* Description — pre-wrap preserves line breaks from the admin textarea */}
                                                    {exp.description && (
                                                        <p style={{ color: "#475569", fontSize: "0.9rem", margin: 0, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
                                                            {exp.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Experience;
