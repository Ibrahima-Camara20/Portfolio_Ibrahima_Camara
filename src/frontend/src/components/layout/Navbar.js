import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
        closeMenu();
    };

    const links = [
        { to: "/", label: t("nav.home"), end: true },
        { to: "/projects", label: t("nav.projects") },
        { to: "/education", label: t("nav.education") },
        { to: "/experience", label: t("nav.experience") },
        { to: "/contact", label: t("nav.contact") },
        { to: "/mes-contacts", label: t("nav.myContacts") },
    ];

    return (
        <nav className="custom-navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link className="navbar-logo" to="/" onClick={closeMenu}>
                    IC
                </Link>

                {/* Hamburger — 3 bars */}
                <button
                    className={`hamburger-btn${menuOpen ? " open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>

                {/* Dropdown menu */}
                <div className={`nav-menu${menuOpen ? " open" : ""}`}>
                    <ul className="nav-menu-list">
                        {links.map((link) => (
                            <li key={link.to} className="nav-menu-item">
                                <NavLink to={link.to} end={link.end} onClick={closeMenu}>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="menu-divider" />
                    <div style={{ padding: "0 0.5rem 0.5rem" }}>
                        <button className="nav-lang-btn" onClick={toggleLanguage}>
                            <FaGlobeAmericas size={13} />
                            {t("nav.lang")}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </nav>
    );
}

export default Navbar;
