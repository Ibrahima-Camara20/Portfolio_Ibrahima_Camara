import React, { useState } from "react";
import API from "../../services/api";
import { useTranslation } from "react-i18next";

function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("contacts/", formData);
            alert(t("contact.success"));
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            alert(t("contact.error"));
            console.error(err);
        }
    };

    return (
        <div className="container mt-4" style={{ paddingTop: "80px" }}>
            <h2>{t("contact.title")}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{t("contact.nameLabel")}</label>
                    <input type="text" name="name" className="form-control" placeholder={t("contact.namePlaceholder")} value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t("contact.emailLabel")}</label>
                    <input type="email" name="email" className="form-control" placeholder={t("contact.emailPlaceholder")} value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t("contact.messageLabel")}</label>
                    <textarea name="message" className="form-control" rows="5" placeholder={t("contact.messagePlaceholder")} value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{t("contact.submit")}</button>
            </form>
        </div>
    );
}

export default Contact;
