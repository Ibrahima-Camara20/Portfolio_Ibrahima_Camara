import React, { useState, useEffect } from "react";
import { getProjects } from "../../services/api";
import { FaCode, FaGithub, FaExternalLinkAlt, FaCalendar } from "react-icons/fa";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await getProjects();
            setProjects(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Impossible de charger les projets");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
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
                <FaCode className="me-3" />
                Mes Projets
            </h1>

            {projects.length === 0 ? (
                <div className="alert alert-info text-center">
                    Aucun projet disponible pour le moment.
                </div>
            ) : (
                <div className="row g-4">
                    {projects.map((project) => (
                        <div key={project.id} className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        className="card-img-top"
                                        alt={project.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                )}
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start mb-3">
                                        <div
                                            className="rounded-circle p-3 me-3"
                                            style={{
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "white",
                                                minWidth: "60px"
                                            }}
                                        >
                                            <FaCode size={24} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 className="card-title mb-2">{project.title}</h4>
                                            <p className="text-muted small mb-3">
                                                <FaCalendar className="me-2" />
                                                {new Date(project.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="card-text mb-3">
                                        {project.description.split('\n').map((line, i) => (
                                            <span key={i}>{line}{i < project.description.split('\n').length - 1 && <br />}</span>
                                        ))}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-3">
                                        <h6 className="text-muted mb-2">Technologies :</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.technologies.split(',').map((tech, index) => (
                                                <span key={index} className="badge bg-secondary">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="d-flex gap-2">
                                        {project.github_link && (
                                            <a
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-dark btn-sm"
                                            >
                                                <FaGithub className="me-2" />
                                                GitHub
                                            </a>
                                        )}
                                        {project.live_link && (
                                            <a
                                                href={project.live_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                <FaExternalLinkAlt className="me-2" />
                                                Démo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
        </div>
    );
}

export default Projects;
