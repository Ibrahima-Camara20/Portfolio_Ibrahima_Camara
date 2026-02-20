import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === "fr" ? "en" : "fr";
        i18n.changeLanguage(newLang);
        closeMenu();
    };

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
                            {t("nav.home")}
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link className="nav-menu-link" to="/contact" onClick={closeMenu}>
                            {t("nav.contact")}
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link className="nav-menu-link" to="/mes-contacts" onClick={closeMenu}>
                            {t("nav.myContacts")}
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <button className="nav-lang-btn" onClick={toggleLanguage}>
                            <FaGlobeAmericas className="me-2" />
                            {t("nav.lang")}
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
