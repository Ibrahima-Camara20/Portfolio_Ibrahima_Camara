import React, { useState, useEffect } from "react";
import { getEducation } from "../../services/api";
import { FaGraduationCap, FaCalendar, FaUniversity } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const content = {
    fr: {
        title: "Mon Parcours Académique",
        empty: "Aucune formation disponible pour le moment.",
        loading: "Chargement...",
        error: "Impossible de charger les formations",
        inProgress: "En cours",
    },
    en: {
        title: "My Academic Background",
        empty: "No education available at the moment.",
        loading: "Loading...",
        error: "Unable to load education",
        inProgress: "In progress",
    },
};

function Education() {
    const { language } = useLanguage();
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const response = await getEducation();
            setEducationList(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching education:", err);
            setError(content[language].error);
        } finally {
            setLoading(false);
        }
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
                <FaGraduationCap className="me-3" />
                {t.title}
            </h1>

            {educationList.length === 0 ? (
                <div className="alert alert-info text-center">{t.empty}</div>
            ) : (
                <div className="row g-4">
                    {educationList.map((edu) => (
                        <div key={edu.id} className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start mb-3">
                                        <div
                                            className="rounded-circle p-3 me-3"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                                color: "white",
                                            }}
                                        >
                                            <FaGraduationCap size={24} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-2">{edu.degree}</h4>
                                            <h6 className="text-muted mb-3">
                                                <FaUniversity className="me-2" />
                                                {edu.university}
                                            </h6>
                                            <p className="text-muted mb-0">
                                                <FaCalendar className="me-2" />
                                                {edu.start_year} -{" "}
                                                {edu.graduation_year || t.inProgress}
                                            </p>
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

export default Education;
