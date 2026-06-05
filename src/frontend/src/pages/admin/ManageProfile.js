import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const EMPTY = {
    full_name: "", subtitle: "", bio: "",
    email: "", phone: "", location: "",
    linkedin_url: "", github_url: "", cv_link: "",
};

function ManageProfile() {
    const [form, setForm]     = useState(EMPTY);
    const [id, setId]         = useState(null);
    const [status, setStatus] = useState(null); // "success" | "error"
    const [loading, setLoading] = useState(true);
    const [saving, setSaving]   = useState(false);

    useEffect(() => {
        API.get("personal-info/").then((r) => {
            if (r.data.length > 0) {
                const d = r.data[0];
                setId(d.id);
                setForm({
                    full_name:    d.full_name    || "",
                    subtitle:     d.subtitle     || "",
                    bio:          d.bio          || "",
                    email:        d.email        || "",
                    phone:        d.phone        || "",
                    location:     d.location     || "",
                    linkedin_url: d.linkedin_url || "",
                    github_url:   d.github_url   || "",
                    cv_link:      d.cv_link       || "",
                });
            }
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            if (id) {
                await API.put(`personal-info/${id}/`, form);
            } else {
                const r = await API.post("personal-info/", form);
                setId(r.data.id);
            }
            setStatus("success");
        } catch {
            setStatus("error");
        } finally {
            setSaving(false);
        }
    };

if (loading) return <div className="admin-empty">Chargement...</div>;

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Mon Profil</h1>
            </div>

            {status === "success" && (
                <div className="admin-alert admin-alert-success">
                    <FaCheckCircle size={14} /> Enregistré avec succès.
                </div>
            )}
            {status === "error" && (
                <div className="admin-alert admin-alert-error">
                    <FaExclamationCircle size={14} /> Une erreur est survenue.
                </div>
            )}

            {/* Main form */}
            <div className="admin-card">
                <h3 style={sectionTitle}>Informations générales</h3>
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">
                        <Field label="Nom complet *" name="full_name" value={form.full_name} onChange={handleChange} required />
                        <Field label="Sous-titre (ex: Ingénieur IA)" name="subtitle" value={form.subtitle} onChange={handleChange} />
                        <div className="admin-form-field full">
                            <label className="admin-label">Bio — texte de la page d'accueil</label>
                            <textarea className="admin-input" name="bio" rows={4} value={form.bio} onChange={handleChange} placeholder="Décrivez-vous en quelques lignes..." />
                        </div>

                        <Field label="Email *" name="email" type="email" value={form.email} onChange={handleChange} required />
                        <Field label="Téléphone" name="phone" value={form.phone} onChange={handleChange} />
                        <Field label="Localisation" name="location" value={form.location} onChange={handleChange} placeholder="Nice, France" />

                        <Field label="URL LinkedIn" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} />
                        <Field label="URL GitHub" name="github_url" value={form.github_url} onChange={handleChange} />
                        <Field label="Lien CV (Google Drive, Dropbox...)" name="cv_link" value={form.cv_link} onChange={handleChange} placeholder="https://drive.google.com/..." />
                    </div>

                    <div className="admin-form-actions" style={{ marginTop: "1.25rem" }}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                            {saving ? "Enregistrement..." : id ? "Mettre à jour" : "Créer le profil"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

function Field({ label, name, value, onChange, type = "text", required, placeholder }) {
    return (
        <div className="admin-form-field">
            <label className="admin-label">{label}</label>
            <input
                className="admin-input"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder || ""}
            />
        </div>
    );
}

const sectionTitle = {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "#334155",
    margin: "0 0 1.25rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
};

export default ManageProfile;
