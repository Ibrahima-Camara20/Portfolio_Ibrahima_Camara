import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCode, FaGraduationCap, FaBriefcase, FaFileAlt } from "react-icons/fa";
import { getSkills } from "../../services/api";
import { useTranslation } from "react-i18next";

function Home() {
    const { t } = useTranslation();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchSkills(); }, []);

    const fetchSkills = async () => {
        try {
            const response = await getSkills();
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setLoading(false);
        }
    };

    const groupSkillsByCategory = () => {
        const grouped = {};
        skills.forEach((skill) => {
            if (!grouped[skill.category]) {
                grouped[skill.category] = { name: skill.category_display, skills: [] };
            }
            grouped[skill.category].skills.push(skill.name);
        });
        return grouped;
    };

    const categoryColors = {
        languages: "primary", langues: "dark", methodes: "secondary",
        ai_ml: "success", web_frameworks: "info", databases: "warning", tools_devops: "danger",
    };

    const mainFeatures = [
        { icon: <FaCode size={40} />, title: t("home.projects"), desc: t("home.projectsDesc"), link: "/projects", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { icon: <FaGraduationCap size={40} />, title: t("home.diploma"), desc: t("home.diplomaDesc"), link: "/education", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { icon: <FaBriefcase size={40} />, title: t("home.experience"), desc: t("home.experienceDesc"), link: "/experience", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    ];

    const cvFeature = {
        icon: <FaFileAlt size={40} />, title: t("home.cv"), desc: t("home.cvDesc"),
        link: "#cv", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    };

    const cardStyle = { transition: "all 0.3s ease", cursor: "pointer" };
    const onEnter = (e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)"; };
    const onLeave = (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; };

    return (
        <div>
            {/* Hero */}
            <section className="text-white py-5" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "60vh", display: "flex", alignItems: "center" }}>
                <div className="container">
                    <div className="col-lg-8">
                        <h1 className="display-3 fw-bold mb-4">{t("home.welcome")}</h1>
                        <h2 className="display-4 mb-4">IBRAHIMA CAMARA</h2>
                        <p className="lead mb-4" style={{ fontSize: "1.2rem" }}>{t("home.description")}</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4 mb-4">
                        {mainFeatures.map((f, i) => (
                            <div key={i} className="col-md-4">
                                <Link to={f.link} className="text-decoration-none" style={{ display: "block", height: "100%" }}>
                                    <div className="card h-100 border-0 shadow-sm" style={cardStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                        <div className="card-body text-center p-4" style={{ background: f.gradient, color: "white", borderRadius: "0.5rem" }}>
                                            <div className="mb-3">{f.icon}</div>
                                            <h3 className="card-title h4 mb-2">{f.title}</h3>
                                            <p className="card-text opacity-75">{f.desc}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="row g-4">
                        <div className="col-12">
                            <Link to={cvFeature.link} className="text-decoration-none">
                                <div className="card border-0 shadow-sm" style={cardStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                    <div className="card-body text-center p-4" style={{ background: cvFeature.gradient, color: "white", borderRadius: "0.5rem" }}>
                                        <div className="mb-3">{cvFeature.icon}</div>
                                        <h3 className="card-title h4 mb-2">{cvFeature.title}</h3>
                                        <p className="card-text opacity-75">{cvFeature.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools */}
            <section id="tools" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">{t("home.technologiesTitle")}</h2>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{t("common.loading")}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {Object.entries(groupSkillsByCategory()).map(([category, data]) => (
                                <div key={category} className="col-md-6 col-lg-4">
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className={`card-header bg-${categoryColors[category]} ${category === "databases" ? "text-dark" : "text-white"}`}>
                                            <h5 className="mb-0">{data.name}</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex flex-wrap gap-2">
                                                {data.skills.map((tech, i) => (
                                                    <span key={i} className={`badge bg-${categoryColors[category]} ${category === "databases" ? "text-dark" : ""} p-2`} style={{ fontSize: "0.9rem" }}>{tech}</span>
                                                ))}
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

export default Home;
