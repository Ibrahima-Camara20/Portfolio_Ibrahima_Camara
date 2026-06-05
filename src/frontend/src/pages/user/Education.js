import React, { useState, useEffect } from "react";
import { getEducation } from "../../services/api";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";

function Education() {
    const { t } = useTranslation();
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getEducation()
            .then((r) => setEducationList(r.data))
            .catch(() => setError(t("education.error")))
            .finally(() => setLoading(false));
    }, [t]);

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
                icon={<FaGraduationCap size={12} />}
                tag={t("nav.education")}
                title={t("education.title")}
            />

            <section className="pf-section">
                <div className="container">
                    {educationList.length === 0 ? (
                        <div className="pf-alert pf-alert-info" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
                            {t("education.empty")}
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="pf-timeline">
                                    {educationList.map((edu) => (
                                        <div key={edu.id} className="pf-timeline-item">
                                            <div className="pf-timeline-dot" />
                                            <div className="pf-card" style={{ padding: "1.75rem", marginLeft: "1.25rem" }}>
                                                {/* Header row */}
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.875rem" }}>
                                                    <h4 style={{ fontSize: "1.05rem", margin: 0, color: "#0f172a", fontWeight: 700, flex: 1 }}>
                                                        {edu.degree}
                                                    </h4>
                                                    <span className="pf-badge" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", flexShrink: 0 }}>
                                                        {edu.start_year} — {edu.graduation_year || t("education.inProgress")}
                                                    </span>
                                                </div>

                                                {/* University */}
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontSize: "0.9rem" }}>
                                                    <FaUniversity size={13} />
                                                    <span>{edu.university}</span>
                                                </div>

                                                {/* In-progress indicator */}
                                                {!edu.graduation_year && (
                                                    <div style={{ marginTop: "0.875rem" }}>
                                                        <span className="pf-badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                                                            ● {t("education.inProgress")}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Education;
