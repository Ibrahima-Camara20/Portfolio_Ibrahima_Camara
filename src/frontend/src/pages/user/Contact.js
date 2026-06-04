import React, { useState } from "react";
import API from "../../services/api";
import { useTranslation } from "react-i18next";
import {
    FaPaperPlane, FaCheckCircle, FaExclamationCircle,
    FaEnvelope, FaUser, FaComment
} from "react-icons/fa";

function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

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
            <section className="pf-section-alt" style={{ minHeight: "calc(100vh - 64px)" }}>
                <div className="container">
                    <div className="pf-section-header">
                        <span className="pf-section-tag">
                            <FaEnvelope size={11} /> Contact
                        </span>
                        <h1 className="pf-section-title">{t("contact.title")}</h1>
                        <p className="pf-section-desc">{t("contact.tagline")}</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="pf-card pf-card-padded">

                                {/* Success state */}
                                {status === "success" && (
                                    <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                                            <FaCheckCircle size={34} color="#10b981" />
                                        </div>
                                        <h4 style={{ color: "#10b981", marginBottom: "0.5rem" }}>{t("contact.success")}</h4>
                                        <p style={{ color: "#64748b", margin: "0 0 1.5rem" }}>{t("contact.successDesc")}</p>
                                        <button
                                            className="pf-btn pf-btn-ghost"
                                            onClick={() => setStatus(null)}
                                        >
                                            {t("contact.submit").replace("Envoyer", "Nouveau").replace("Send", "New")} →
                                        </button>
                                    </div>
                                )}

                                {/* Form */}
                                {status !== "success" && (
                                    <form onSubmit={handleSubmit}>
                                        {status === "error" && (
                                            <div className="pf-alert pf-alert-danger" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                                <FaExclamationCircle size={14} flexShrink="0" />
                                                {t("contact.error")}
                                            </div>
                                        )}

                                        <FieldGroup label={t("contact.nameLabel")} icon={<FaUser size={11} />}>
                                            <input
                                                className="pf-input"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t("contact.namePlaceholder")}
                                                required
                                            />
                                        </FieldGroup>

                                        <FieldGroup label={t("contact.emailLabel")} icon={<FaEnvelope size={11} />}>
                                            <input
                                                className="pf-input"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t("contact.emailPlaceholder")}
                                                required
                                            />
                                        </FieldGroup>

                                        <FieldGroup label={t("contact.messageLabel")} icon={<FaComment size={11} />} last>
                                            <textarea
                                                className="pf-input"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder={t("contact.messagePlaceholder")}
                                                rows={6}
                                                required
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

export default Contact;
