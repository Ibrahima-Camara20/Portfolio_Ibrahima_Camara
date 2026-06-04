import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const CATEGORIES = [
    { value: "student_job", label: "Job Étudiant" },
    { value: "internship",  label: "Stage" },
    { value: "permanent",   label: "CDI" },
    { value: "temporary",   label: "CDD" },
    { value: "freelance",   label: "Freelance" },
];

const EMPTY = {
    title: "", company: "", location: "", category: "student_job",
    start_date: "", end_date: "", description: "", is_current: false,
};

function ManageExperience() {
    const [items, setItems]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [form, setForm]         = useState(EMPTY);
    const [editId, setEditId]     = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving]     = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = () =>
        API.get("experiences/").then((r) => setItems(r.data)).finally(() => setLoading(false));

    const openNew  = () => { setForm(EMPTY); setEditId(null); setShowForm(true); window.scrollTo(0, 0); };
    const openEdit = (item) => {
        setForm({
            title:       item.title       || "",
            company:     item.company     || "",
            location:    item.location    || "",
            category:    item.category    || "student_job",
            start_date:  item.start_date  || "",
            end_date:    item.end_date    || "",
            description: item.description || "",
            is_current:  item.is_current  ?? false,
        });
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };
    const closeForm    = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "is_current" && checked ? { end_date: "" } : {}),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            end_date: form.is_current ? null : form.end_date || null,
        };
        try {
            if (editId) {
                await API.put(`experiences/${editId}/`, payload);
            } else {
                await API.post("experiences/", payload);
            }
            closeForm();
            fetchItems();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cette expérience ?")) return;
        await API.delete(`experiences/${id}/`);
        fetchItems();
    };

    const categoryLabel = (val) => CATEGORIES.find((c) => c.value === val)?.label ?? val;

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Expériences</h1>
                {!showForm && (
                    <button className="admin-btn admin-btn-primary" onClick={openNew}>
                        <FaPlus size={11} /> Ajouter une expérience
                    </button>
                )}
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                    <div className="admin-form-header">
                        <h3 className="admin-form-title">{editId ? "Modifier l'expérience" : "Nouvelle expérience"}</h3>
                        <button className="admin-btn admin-btn-secondary admin-btn-icon" onClick={closeForm}>
                            <FaTimes size={13} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field">
                                <label className="admin-label">Intitulé du poste *</label>
                                <input className="admin-input" name="title" value={form.title} onChange={handleChange} required placeholder="Développeur Full Stack" />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Entreprise *</label>
                                <input className="admin-input" name="company" value={form.company} onChange={handleChange} required placeholder="Nom de l'entreprise" />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Localisation *</label>
                                <input className="admin-input" name="location" value={form.location} onChange={handleChange} required placeholder="Nice, France" />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Type de contrat *</label>
                                <select className="admin-input" name="category" value={form.category} onChange={handleChange}>
                                    {CATEGORIES.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Date de début *</label>
                                <input className="admin-input" type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Date de fin <span style={{ color: "#94a3b8", fontWeight: 400 }}>(vide si poste actuel)</span></label>
                                <input className="admin-input" type="date" name="end_date" value={form.end_date} onChange={handleChange} disabled={form.is_current} />
                            </div>
                            <div className="admin-form-field full" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <input type="checkbox" id="is_current" name="is_current" checked={form.is_current} onChange={handleChange} style={{ width: 16, height: 16, cursor: "pointer" }} />
                                <label htmlFor="is_current" className="admin-label" style={{ margin: 0, cursor: "pointer" }}>Poste actuel</label>
                            </div>
                            <div className="admin-form-field full">
                                <label className="admin-label">Description *</label>
                                <textarea className="admin-input" name="description" rows={4} value={form.description} onChange={handleChange} required placeholder="Décrivez vos responsabilités et réalisations..." />
                            </div>
                        </div>
                        <div className="admin-form-actions" style={{ marginTop: "1.25rem" }}>
                            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                                {saving ? "Enregistrement..." : editId ? "Mettre à jour" : "Créer"}
                            </button>
                            <button type="button" className="admin-btn admin-btn-secondary" onClick={closeForm}>Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                {loading ? (
                    <div className="admin-empty">Chargement...</div>
                ) : items.length === 0 ? (
                    <div className="admin-empty">Aucune expérience. Cliquez sur "Ajouter une expérience" pour commencer.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Poste</th>
                                <th>Entreprise</th>
                                <th>Type</th>
                                <th>Période</th>
                                <th style={{ width: 110 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.title}</td>
                                    <td style={{ color: "#64748b" }}>{item.company}</td>
                                    <td>
                                        <span style={{ background: "#f1f5f9", color: "#475569", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
                                            {categoryLabel(item.category)}
                                        </span>
                                    </td>
                                    <td style={{ color: "#64748b", fontSize: "0.82rem" }}>
                                        {item.start_date} — {item.is_current ? <span style={{ color: "#10b981", fontWeight: 600 }}>En cours</span> : item.end_date}
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "0.4rem" }}>
                                            <button className="admin-btn admin-btn-secondary admin-btn-icon" onClick={() => openEdit(item)} title="Modifier">
                                                <FaEdit size={12} />
                                            </button>
                                            <button className="admin-btn admin-btn-danger admin-btn-icon" onClick={() => handleDelete(item.id)} title="Supprimer">
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ManageExperience;
