import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const EMPTY = { degree: "", university: "", start_year: "", graduation_year: "" };

function ManageEducation() {
    const [items, setItems]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [form, setForm]         = useState(EMPTY);
    const [editId, setEditId]     = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving]     = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = () =>
        API.get("education/").then((r) => setItems(r.data)).finally(() => setLoading(false));

    const openNew  = () => { setForm(EMPTY); setEditId(null); setShowForm(true); window.scrollTo(0, 0); };
    const openEdit = (item) => {
        setForm({
            degree:          item.degree          || "",
            university:      item.university      || "",
            start_year:      item.start_year      ?? "",
            graduation_year: item.graduation_year ?? "",
        });
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };
    const closeForm   = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            start_year:      form.start_year      !== "" ? parseInt(form.start_year)      : null,
            graduation_year: form.graduation_year !== "" ? parseInt(form.graduation_year) : null,
        };
        try {
            if (editId) {
                await API.put(`education/${editId}/`, payload);
            } else {
                await API.post("education/", payload);
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
        if (!window.confirm("Supprimer cette formation ?")) return;
        await API.delete(`education/${id}/`);
        fetchItems();
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Formations</h1>
                {!showForm && (
                    <button className="admin-btn admin-btn-primary" onClick={openNew}>
                        <FaPlus size={11} /> Ajouter une formation
                    </button>
                )}
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                    <div className="admin-form-header">
                        <h3 className="admin-form-title">{editId ? "Modifier la formation" : "Nouvelle formation"}</h3>
                        <button className="admin-btn admin-btn-secondary admin-btn-icon" onClick={closeForm}>
                            <FaTimes size={13} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field full">
                                <label className="admin-label">Diplôme / Formation *</label>
                                <input className="admin-input" name="degree" value={form.degree} onChange={handleChange} required placeholder="Master 1 Intelligence Artificielle" />
                            </div>
                            <div className="admin-form-field full">
                                <label className="admin-label">Université / École *</label>
                                <input className="admin-input" name="university" value={form.university} onChange={handleChange} required placeholder="Université Côte d'Azur" />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Année de début *</label>
                                <input className="admin-input" type="number" name="start_year" value={form.start_year} onChange={handleChange} required placeholder="2024" min="1950" max="2100" />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Année de fin <span style={{ color: "#94a3b8", fontWeight: 400 }}>(vide = en cours)</span></label>
                                <input className="admin-input" type="number" name="graduation_year" value={form.graduation_year} onChange={handleChange} placeholder="2025" min="1950" max="2100" />
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
                    <div className="admin-empty">Aucune formation. Cliquez sur "Ajouter une formation" pour commencer.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Diplôme</th>
                                <th>Université</th>
                                <th>Période</th>
                                <th style={{ width: 110 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.degree}</td>
                                    <td style={{ color: "#64748b" }}>{item.university}</td>
                                    <td style={{ color: "#64748b", fontSize: "0.82rem" }}>
                                        {item.start_year} — {item.graduation_year ?? <span style={{ color: "#10b981", fontWeight: 600 }}>En cours</span>}
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

export default ManageEducation;
