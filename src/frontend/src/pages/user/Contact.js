import React, { useState } from "react";
import API from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";

const content = {
    fr: {
        title: "Contactez-moi",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "Votre email",
        messagePlaceholder: "Votre message",
        nameLabel: "Nom",
        emailLabel: "Email",
        messageLabel: "Message",
        submit: "Envoyer le message",
        success: "Message envoyé avec succès !",
        error: "Échec de l'envoi du message",
    },
    en: {
        title: "Contact Me",
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        messagePlaceholder: "Your message",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        submit: "Send Message",
        success: "Message sent successfully!",
        error: "Failed to send message",
    },
};

function Contact() {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const t = content[language];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("contacts/", formData);
            alert(t.success);
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            alert(t.error);
            console.error(err);
        }
    };

    return (
        <div className="container mt-4" style={{ paddingTop: "80px" }}>
            <h2>{t.title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{t.nameLabel}</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder={t.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t.emailLabel}</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder={t.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t.messageLabel}</label>
                    <textarea
                        name="message"
                        className="form-control"
                        rows="5"
                        placeholder={t.messagePlaceholder}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {t.submit}
                </button>
            </form>
        </div>
    );
}

export default Contact;
