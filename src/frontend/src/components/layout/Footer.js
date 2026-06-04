import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer style={footerStyle}>
            <div className="container">
                <div style={innerStyle}>
                    {/* Brand */}
                    <div>
                        <span style={brandStyle}>Ibrahima Camara</span>
                        <p style={{ margin: "0.3rem 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                            © 2026 · {t("footer.rights")}
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                        {[
                            ["/projects", t("nav.projects")],
                            ["/education", t("nav.education")],
                            ["/experience", t("nav.experience")],
                            ["/contact", t("nav.contact")],
                        ].map(([to, label]) => (
                            <Link key={to} to={to} style={navLinkStyle}>
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Made with */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748b", fontSize: "0.82rem" }}>
                        <FaHeart size={11} color="#ef4444" />
                        {t("footer.tagline")}
                    </div>
                </div>
            </div>
        </footer>
    );
}

const footerStyle = {
    background: "#0f172a",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "2rem 0",
};

const innerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1.25rem",
};

const brandStyle = {
    fontWeight: 800,
    fontSize: "1rem",
    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};

const navLinkStyle = {
    color: "#64748b",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "color 0.2s",
};

export default Footer;
