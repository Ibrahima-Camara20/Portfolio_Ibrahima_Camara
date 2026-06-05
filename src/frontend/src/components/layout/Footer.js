import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer style={footerStyle}>
            <div className="container">
                <div style={innerStyle}>
                    <span style={brandStyle}>Ibrahima Camara</span>
                    <span style={rightsStyle}>
                        © {new Date().getFullYear()} · {t("footer.rights")}
                    </span>
                </div>
            </div>
        </footer>
    );
}

const footerStyle = {
    background: "#0f172a",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "1.5rem 0",
};

const innerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
};

const brandStyle = {
    fontWeight: 800,
    fontSize: "0.95rem",
    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};

const rightsStyle = {
    fontSize: "0.82rem",
    color: "#475569",
};

export default Footer;
