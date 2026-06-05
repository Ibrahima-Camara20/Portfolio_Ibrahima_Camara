import React, { useState, useEffect } from "react";
import API, { getPersonalInfo } from "../../services/api";
import { useTranslation } from "react-i18next";
import {
    FaPaperPlane, FaCheckCircle, FaExclamationCircle,
    FaEnvelope, FaUser, FaComment, FaMapMarkerAlt,
    FaPhone, FaClock, FaLinkedin, FaGithub,
} from "react-icons/fa";
import PageHero from "../../components/common/PageHero";

function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        getPersonalInfo()
            .then((r) => { if (r.data.length > 0) setInfo(r.data[0]); })
            .catch(() => {});
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await API.post("contacts/", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="pf-page">
            <PageHero
                icon={<FaEnvelope size={11} />}
                tag="Contact"
                title={t("contact.title")}
            />

            <section className="pf-section">
                <div className="container">
                    <div className="row g-5 align-items-start">

                        {/* ── Left info panel ── */}
                        <div className="col-lg-5">
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
                                {t("contact.sideSectionTitle")}
                            </h2>
                            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                                {t("contact.tagline")}
                            </p>

                            {/* Info items */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                                {/* Availability */}
                                <div style={infoRow}>
                                    <div style={{ ...infoIcon, background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                                        <FaClock size={15} />
                                    </div>
                                    <div>
                                        <p style={infoMeta}>{t("contact.sideAvailabilityLabel")}</p>
                                        <p style={infoVal}>{t("contact.sideAvailabilityValue")}</p>
                                    </div>
                                </div>

                                {/* Response time */}
                                <div style={infoRow}>
                                    <div style={{ ...infoIcon, background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                                        <FaPaperPlane size={14} />
                                    </div>
                                    <div>
                                        <p style={infoMeta}>{t("contact.sideResponseLabel")}</p>
                                        <p style={infoVal}>{t("contact.sideResponseValue")}</p>
                                    </div>
                                </div>

                                {/* Email (from personal info if available) */}
                                {info?.email && (
                                    <div style={infoRow}>
                                        <div style={{ ...infoIcon, background: "rgba(6,182,212,0.1)", color: "#06b6d4" }}>
                                            <FaEnvelope size={14} />
                                        </div>
                                        <div>
                                            <p style={infoMeta}>{t("contact.emailLabel")}</p>
                                            <p style={infoVal}>{info.email}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Phone */}
                                {info?.phone && (
                                    <div style={infoRow}>
                                        <div style={{ ...infoIcon, background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                                            <FaPhone size={14} />
                                        </div>
                                        <div>
                                            <p style={infoMeta}>{t("contact.phoneLabel")}</p>
                                            <p style={infoVal}>{info.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Location */}
                                {info?.location && (
                                    <div style={infoRow}>
                                        <div style={{ ...infoIcon, background: "rgba(139,92,246,0.1)", color: "#8b5cf6" }}>
                                            <FaMapMarkerAlt size={14} />
                                        </div>
                                        <div>
                                            <p style={infoMeta}>{t("myContacts.location")}</p>
                                            <p style={infoVal}>{info.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social links */}
                            {(info?.linkedin_url || info?.github_url) && (
                                <div style={{ display: "flex", gap: "0.75rem" }}>
                                    {info.linkedin_url && (
                                        <a href={info.linkedin_url} target="_blank" rel="noopener noreferrer"
                                            className="pf-btn pf-btn-ghost" style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}>
                                            <FaLinkedin size={14} /> LinkedIn
                                        </a>
                                    )}
                                    {info.github_url && (
                                        <a href={info.github_url} target="_blank" rel="noopener noreferrer"
                                            className="pf-btn pf-btn-ghost" style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}>
                                            <FaGithub size={14} /> GitHub
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ── Right form ── */}
                        <div className="col-lg-7">
                            <div className="pf-card pf-card-padded">
                                {/* Success state */}
                                {status === "success" && (
                                    <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                                            <FaCheckCircle size={34} color="#10b981" />
                                        </div>
                                        <h4 style={{ color: "#10b981", marginBottom: "0.5rem" }}>{t("contact.success")}</h4>
                                        <p style={{ color: "#64748b", margin: "0 0 1.5rem" }}>{t("contact.successDesc")}</p>
                                        <button className="pf-btn pf-btn-ghost" onClick={() => setStatus(null)}>
                                            {t("contact.newMessage")} →
                                        </button>
                                    </div>
                                )}

                                {/* Form */}
                                {status !== "success" && (
                                    <form onSubmit={handleSubmit}>
                                        {status === "error" && (
                                            <div className="pf-alert pf-alert-danger" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                                <FaExclamationCircle size={14} />
                                                {t("contact.error")}
                                            </div>
                                        )}

                                        <FieldGroup label={t("contact.nameLabel")} icon={<FaUser size={11} />}>
                                            <input
                                                className="pf-input" type="text" name="name"
                                                value={formData.name} onChange={handleChange}
                                                placeholder={t("contact.namePlaceholder")} required
                                            />
                                        </FieldGroup>

                                        <FieldGroup label={t("contact.emailLabel")} icon={<FaEnvelope size={11} />}>
                                            <input
                                                className="pf-input" type="email" name="email"
                                                value={formData.email} onChange={handleChange}
                                                placeholder={t("contact.emailPlaceholder")} required
                                            />
                                        </FieldGroup>

                                        <FieldGroup label={t("contact.messageLabel")} icon={<FaComment size={11} />} last>
                                            <textarea
                                                className="pf-input" name="message"
                                                value={formData.message} onChange={handleChange}
                                                placeholder={t("contact.messagePlaceholder")}
                                                rows={6} required
                                            />
                                        </FieldGroup>

                                        <button
                                            type="submit"
                                            className="pf-btn pf-btn-primary"
                                            disabled={status === "loading"}
                                            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <div className="pf-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                                                    {t("contact.sending")}
                                                </>
                                            ) : (
                                                <>
                                                    <FaPaperPlane size={13} />
                                                    {t("contact.submit")}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FieldGroup({ label, icon, children, last }) {
    return (
        <div style={{ marginBottom: last ? "1.75rem" : "1.25rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, fontSize: "0.85rem", color: "#334155", marginBottom: "0.5rem" }}>
                {icon} {label}
            </label>
            {children}
        </div>
    );
}

const infoRow = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
};

const infoIcon = {
    width: 42,
    height: 42,
    borderRadius: 10,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const infoMeta = {
    margin: 0,
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
};

const infoVal = {
    margin: "0.15rem 0 0",
    fontSize: "0.92rem",
    color: "#334155",
    fontWeight: 500,
};

export default Contact;
