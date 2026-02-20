import React, { useState, useEffect } from "react";
import { getExperiences } from "../../services/api";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const content = {
    fr: {
        title: "Mon Parcours Professionnel",
        empty: "Aucune expérience disponible pour le moment.",
        loading: "Chargement...",
        error: "Impossible de charger les expériences",
        current: "En cours",
        today: "Aujourd'hui",
        locale: "fr-FR",
    },
    en: {
        title: "My Professional Journey",
        empty: "No experience available at the moment.",
        loading: "Loading...",
        error: "Unable to load experiences",
        current: "Current",
        today: "Today",
        locale: "en-GB",
    },
};

function Experience() {
    const { language } = useLanguage();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const response = await getExperiences();
            setExperiences(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching experiences:", err);
            setError(content[language].error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            student_job: "#4facfe",
            internship: "#43e97b",
            permanent: "#667eea",
            temporary: "#fa709a",
            freelance: "#f093fb",
        };
        return colors[category] || "#667eea";
    };

    const t = content[language];

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t.loading}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">
                <FaBriefcase className="me-3" />
                {t.title}
            </h1>

            {experiences.length === 0 ? (
                <div className="alert alert-info text-center">{t.empty}</div>
            ) : (
                <div className="row g-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start mb-3">
                                        <div
                                            className="rounded-circle p-3 me-3"
                                            style={{
                                                background: `linear-gradient(135deg, ${getCategoryColor(
                                                    exp.category
                                                )} 0%, ${getCategoryColor(exp.category)}99 100%)`,
                                                color: "white",
                                            }}
                                        >
                                            <FaBriefcase size={24} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h4 className="card-title mb-0">{exp.title}</h4>
                                                {exp.is_current && (
                                                    <span className="badge bg-success">{t.current}</span>
                                                )}
                                            </div>
                                            <h6 className="text-muted mb-2">{exp.company}</h6>
                                            <p className="text-muted small mb-2">
                                                <FaMapMarkerAlt className="me-2" />
                                                {exp.location}
                                            </p>
                                            <p className="text-muted small mb-3">
                                                <FaCalendar className="me-2" />
                                                {new Date(exp.start_date).toLocaleDateString(
                                                    t.locale,
                                                    { month: "long", year: "numeric" }
                                                )}{" "}
                                                -{" "}
                                                {exp.end_date
                                                    ? new Date(exp.end_date).toLocaleDateString(
                                                        t.locale,
                                                        { month: "long", year: "numeric" }
                                                    )
                                                    : t.today}
                                            </p>
                                            <span
                                                className="badge mb-3"
                                                style={{
                                                    backgroundColor: getCategoryColor(exp.category),
                                                }}
                                            >
                                                <FaTag className="me-1" />
                                                {exp.category_display}
                                            </span>
                                            <p className="card-text">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .hover-card { transition: all 0.3s ease; }
        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
      `}</style>
        </div>
    );
}

export default Experience;
