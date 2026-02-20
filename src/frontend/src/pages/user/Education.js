import React, { useState, useEffect } from "react";
import { getEducation } from "../../services/api";
import { FaGraduationCap, FaCalendar, FaUniversity } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Education() {
    const { t } = useTranslation();
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { fetchEducation(); }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const response = await getEducation();
            setEducationList(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching education:", err);
            setError(t("education.error"));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{t("common.loading")}</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container py-5">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">
                <FaGraduationCap className="me-3" />
                {t("education.title")}
            </h1>
            {educationList.length === 0 ? (
                <div className="alert alert-info text-center">{t("education.empty")}</div>
            ) : (
                <div className="row g-4">
                    {educationList.map((edu) => (
                        <div key={edu.id} className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start mb-3">
                                        <div className="rounded-circle p-3 me-3" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
                                            <FaGraduationCap size={24} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-2">{edu.degree}</h4>
                                            <h6 className="text-muted mb-3"><FaUniversity className="me-2" />{edu.university}</h6>
                                            <p className="text-muted mb-0">
                                                <FaCalendar className="me-2" />
                                                {edu.start_year} - {edu.graduation_year || t("education.inProgress")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <style>{`.hover-card{transition:all .3s ease}.hover-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.15)!important}`}</style>
        </div>
    );
}

export default Education;
