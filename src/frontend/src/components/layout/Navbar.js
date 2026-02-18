import React from "react";
import { Link } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";

function Navbar({ language, setLanguage }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    My Portfolio
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="btn btn-outline-light ms-3"
                                to="/contact"
                            >
                                Contact Me
                            </Link>
                        </li>
                        <li className="nav-item ms-2">
                            <button
                                className="btn btn-outline-light"
                                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                            >
                                <FaGlobeAmericas className="me-2" />
                                {language === "fr" ? "English" : "Français"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
