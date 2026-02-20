import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaCode,
    FaGraduationCap,
    FaBriefcase,
    FaFileAlt,
} from "react-icons/fa";
import { getSkills } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

const content = {
    fr: {
        welcome: "Bienvenue sur mon Portfolio",
        description:
            "Étudiant en Master 1 Intelligence Artificielle à l'Université Côte d'Azur, je recherche une alternance pour mettre à profit mes compétences en développement logiciel, intelligence artificielle et systèmes embarqués. Particulièrement intéressé par les problématiques de cybersécurité, de détection d'anomalies et de systèmes intelligents sécurisés. Curieux, rigoureux et doté d'un bon esprit d'équipe.",
        projects: "Projets",
        projectsDesc: "Découvrez mes réalisations",
        diploma: "Diplôme",
        diplomaDesc: "Mon parcours académique",
        tools: "Outils",
        toolsDesc: "Technologies que je maîtrise",
        experience: "Expérience",
        experienceDesc: "Mon parcours professionnel",
        cv: "CV",
        cvDesc: "Téléchargez mon curriculum vitae",
        technologiesTitle: "Technologies & Outils",
        loading: "Chargement...",
    },
    en: {
        welcome: "Welcome to My Portfolio",
        description:
            "Master 1 Artificial Intelligence student at Université Côte d'Azur, seeking an internship to apply my skills in software development, artificial intelligence and embedded systems. Particularly interested in cybersecurity, anomaly detection and secure intelligent systems. Curious, rigorous and a great team player.",
        projects: "Projects",
        projectsDesc: "Discover my work",
        diploma: "Degree",
        diplomaDesc: "My academic background",
        tools: "Tools",
        toolsDesc: "Technologies I master",
        experience: "Experience",
        experienceDesc: "My professional journey",
        cv: "Resume",
        cvDesc: "Download my resume",
        technologiesTitle: "Technologies & Tools",
        loading: "Loading...",
    },
};

function Home() {
    const { language } = useLanguage();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

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
                grouped[skill.category] = {
                    name: skill.category_display,
                    skills: [],
                };
            }
            grouped[skill.category].skills.push(skill.name);
        });
        return grouped;
    };

    const categoryColors = {
        languages: "primary",
        langues: "dark",
        methodes: "secondary",
        ai_ml: "success",
        web_frameworks: "info",
        databases: "warning",
        tools_devops: "danger",
    };

    const t = content[language];

    const mainFeatures = [
        {
            icon: <FaCode size={40} />,
            title: t.projects,
            desc: t.projectsDesc,
            link: "/projects",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
            icon: <FaGraduationCap size={40} />,
            title: t.diploma,
            desc: t.diplomaDesc,
            link: "/education",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
            icon: <FaBriefcase size={40} />,
            title: t.experience,
            desc: t.experienceDesc,
            link: "/experience",
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        },
    ];

    const cvFeature = {
        icon: <FaFileAlt size={40} />,
        title: t.cv,
        desc: t.cvDesc,
        link: "#cv",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                className="hero-section text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="display-3 fw-bold mb-4">{t.welcome}</h1>
                            <h2 className="display-4 mb-4">IBRAHIMA CAMARA</h2>
                            <p className="lead mb-4" style={{ fontSize: "1.2rem" }}>
                                {t.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4 mb-4">
                        {mainFeatures.map((feature, index) => (
                            <div key={index} className="col-md-4">
                                <Link
                                    to={feature.link}
                                    className="text-decoration-none"
                                    style={{ display: "block", height: "100%" }}
                                >
                                    <div
                                        className="card h-100 border-0 shadow-sm hover-card"
                                        style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-10px)";
                                            e.currentTarget.style.boxShadow =
                                                "0 10px 30px rgba(0,0,0,0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "";
                                        }}
                                    >
                                        <div
                                            className="card-body text-center p-4"
                                            style={{
                                                background: feature.gradient,
                                                color: "white",
                                                borderRadius: "0.5rem",
                                            }}
                                        >
                                            <div className="mb-3">{feature.icon}</div>
                                            <h3 className="card-title h4 mb-2">{feature.title}</h3>
                                            <p className="card-text opacity-75">{feature.desc}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* CV Card */}
                    <div className="row g-4">
                        <div className="col-12">
                            <Link
                                to={cvFeature.link}
                                className="text-decoration-none"
                                style={{ display: "block", height: "100%" }}
                            >
                                <div
                                    className="card border-0 shadow-sm hover-card"
                                    style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-10px)";
                                        e.currentTarget.style.boxShadow =
                                            "0 10px 30px rgba(0,0,0,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "";
                                    }}
                                >
                                    <div
                                        className="card-body text-center p-4"
                                        style={{
                                            background: cvFeature.gradient,
                                            color: "white",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
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

            {/* Tools Section */}
            <section id="tools" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">{t.technologiesTitle}</h2>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">{t.loading}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {Object.entries(groupSkillsByCategory()).map(([category, data]) => (
                                <div key={category} className="col-md-6 col-lg-4">
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div
                                            className={`card-header bg-${categoryColors[category]} ${category === "databases" ? "text-dark" : "text-white"
                                                }`}
                                        >
                                            <h5 className="mb-0">{data.name}</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex flex-wrap gap-2">
                                                {data.skills.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className={`badge bg-${categoryColors[category]
                                                            } ${category === "databases" ? "text-dark" : ""
                                                            } p-2`}
                                                        style={{ fontSize: "0.9rem" }}
                                                    >
                                                        {tech}
                                                    </span>
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
