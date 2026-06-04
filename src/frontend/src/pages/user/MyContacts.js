import React, { useState, useEffect } from "react";
import { getPersonalInfo } from "../../services/api";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function MyContacts() {
    const { t } = useTranslation();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPersonalInfo()
            .then((r) => { if (r.data.length > 0) setInfo(r.data[0]); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="pf-page pf-loading"><div className="pf-spinner" /></div>
    );

    if (!info) return (
        <div className="pf-page">
            <section className="pf-section">
                <div className="container">
                    <div className="pf-alert pf-alert-info" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
                        {t("myContacts.noData")}
                    </div>
                </div>
            </section>
        </div>
    );

    const initials = info.full_name
        ?.split(" ").map((n) => n[0]).slice(0, 2).join("") || "IC";

    const contactItems = [
        { icon: <FaEnvelope size={15} />, label: t("contact.emailLabel"), value: info.email, color: "#6366f1" },
        { icon: <FaPhone size={15} />, label: t("contact.phoneLabel") || "Téléphone", value: info.phone, color: "#8b5cf6" },
        { icon: <FaMapMarkerAlt size={15} />, label: t("myContacts.location"), value: info.location, color: "#06b6d4" },
    ].filter((item) => item.value);

    const socialLinks = [
        { icon: <FaLinkedin size={22} />, url: info.linkedin_url, label: "LinkedIn", color: "#0077b5", bg: "rgba(0,119,181,0.09)" },
        { icon: <FaGithub size={22} />, url: info.github_url, label: "GitHub", color: "#0f172a", bg: "rgba(15,23,42,0.07)" },
        { icon: <FaFileDownload size={20} />, url: info.cv_file, label: "CV", color: "#10b981", bg: "rgba(16,185,129,0.09)" },
    ].filter((s) => s.url);

    return (
        <div className="pf-page">
            <section className="pf-section-alt" style={{ minHeight: "calc(100vh - 64px)" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">

                            {/* Profile card */}
                            <div className="pf-card" style={{ marginBottom: "1.25rem", overflow: "visible" }}>
                                {/* Gradient header */}
                                <div style={profileHeader}>
                                    <div style={avatarStyle}>{initials}</div>
                                    <h2 style={{ color: "white", margin: "0 0 0.3rem", fontSize: "1.5rem", fontWeight: 800 }}>
                                        {info.full_name}
                                    </h2>
                                    <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                                        <FaMapMarkerAlt size={11} /> {info.location}
                                    </p>
                                </div>

                                {/* Contact details */}
                                <div style={{ padding: "0.5rem 1.75rem 1.75rem" }}>
                                    {contactItems.map((item, i) => (
                                        <div key={i} style={{
                                            display: "flex", alignItems: "center", gap: "1rem",
                                            padding: "0.875rem 0",
                                            borderBottom: i < contactItems.length - 1 ? "1px solid #f1f5f9" : "none",
                                        }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                                background: `${item.color}15`, color: item.color,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                                                    {item.label}
                                                </p>
                                                <p style={{ margin: 0, fontSize: "0.95rem", color: "#334155", fontWeight: 500 }}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social / CV buttons */}
                            {socialLinks.length > 0 && (
                                <div className="social-grid">
                                    {socialLinks.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pf-card"
                                            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.25rem 0.75rem", gap: "0.5rem", textDecoration: "none", color: link.color }}
                                        >
                                            <div style={{ width: 48, height: 48, borderRadius: 12, background: link.bg, color: link.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                {link.icon}
                                            </div>
                                            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{link.label}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const profileHeader = {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    padding: "2.5rem 1.75rem 2rem",
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
};

const avatarStyle = {
    width: 78,
    height: 78,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    border: "3px solid rgba(255,255,255,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    fontWeight: 900,
    color: "white",
    margin: "0 auto 1rem",
    letterSpacing: "-1px",
};

export default MyContacts;
