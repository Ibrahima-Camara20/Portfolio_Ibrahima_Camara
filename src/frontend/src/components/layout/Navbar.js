import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ language, setLanguage }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="custom-navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link className="navbar-logo" to="/" onClick={closeMenu}>
                    My Portfolio
                </Link>

                {/* Hamburger button */}
                <button className="hamburger-btn" onClick={toggleMenu} aria-label="Menu">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Dropdown menu */}
                <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
                    <li className="nav-menu-item">
                        <Link className="nav-menu-link" to="/" onClick={closeMenu}>
                            Accueil
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link className="nav-menu-link" to="/contact" onClick={closeMenu}>
                            Contact Me
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link className="nav-menu-link" to="/mes-contacts" onClick={closeMenu}>
                            Mes Contacts
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <button
                            className="nav-lang-btn"
                            onClick={() => {
                                setLanguage(language === "fr" ? "en" : "fr");
                                closeMenu();
                            }}
                        >
                            <FaGlobeAmericas className="me-2" />
                            {language === "fr" ? "English" : "Français"}
                        </button>
                    </li>
                </ul>

                {/* Overlay */}
                {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
            </div>
        </nav>
    );
}

export default Navbar;
