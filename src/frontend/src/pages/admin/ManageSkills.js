import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const CATEGORIES = [
    { value: "languages",        label: "Langages" },
    { value: "langues",          label: "Langues" },
    { value: "methodes",         label: "Méthodes" },
    { value: "machine_learning", label: "Machine Learning" },
    { value: "deep_learning",    label: "Deep Learning" },
    { value: "web_frameworks",   label: "Frameworks Web" },
    { value: "databases",        label: "Bases de Données" },
    { value: "tools_mlops",      label: "Outils & MLOps" },
];

const PROFICIENCY = [
    { value: "beginner",     label: "Débutant" },
    { value: "intermediate", label: "Intermédiaire" },
    { value: "advanced",     label: "Avancé" },
    { value: "expert",       label: "Expert" },
];

const PROFICIENCY_COLOR = {
    beginner:     { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
    intermediate: { color: "#06b6d4", bg: "rgba(6,182,212,0.09)" },
    advanced:     { color: "#8b5cf6", bg: "rgba(139,92,246,0.09)" },
    expert:       { color: "#6366f1", bg: "rgba(99,102,241,0.09)" },
};

const EMPTY = { name: "", category: "languages", proficiency_level: "intermediate", order: 0 };

function ManageSkills() {
    const [items, setItems]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [form, setForm]         = useState(EMPTY);
    const [editId, setEditId]     = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving]     = useState(false);
    const [filterCat, setFilterCat] = useState("all");

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = () =>
        API.get("skills/").then((r) => setItems(r.data)).finally(() => setLoading(false));

    const openNew  = () => { setForm(EMPTY); setEditId(null); setShowForm(true); window.scrollTo(0, 0); };
    const openEdit = (item) => {
        setForm({
            name:              item.name              || "",
            category:          item.category          || "languages",
            proficiency_level: item.proficiency_level || "intermediate",
            order:             item.order             ?? 0,
        });
        setEditId(item.id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };
    const closeForm    = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = { ...form, order: parseInt(form.order) || 0 };
        try {
            if (editId) {
                await API.put(`skills/${editId}/`, payload);
            } else {
                await API.post("skills/", payload);
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
        if (!window.confirm("Supprimer cette compétence ?")) return;
        await API.delete(`skills/${id}/`);
        fetchItems();
    };

    const categoryLabel = (val) => CATEGORIES.find((c) => c.value === val)?.label ?? val;
    const proficiencyLabel = (val) => PROFICIENCY.find((p) => p.value === val)?.label ?? val;

    const filteredItems = filterCat === "all" ? items : items.filter((i) => i.category === filterCat);

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Compétences</h1>
                {!showForm && (
                    <button className="admin-btn admin-btn-primary" onClick={openNew}>
                        <FaPlus size={11} /> Ajouter une compétence
                    </button>
                )}
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                    <div className="admin-form-header">
                        <h3 className="admin-form-title">{editId ? "Modifier la compétence" : "Nouvelle compétence"}</h3>
                        <button className="admin-btn admin-btn-secondary admin-btn-icon" onClick={closeForm}>
                            <FaTimes size={13} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-field full">
                                <label className="admin-label">Nom *</label>
                                <input className="admin-input" name="name" value={form.name} onChange={handleChange} required placeholder="Python, React, PostgreSQL..." />
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Catégorie *</label>
                                <select className="admin-input" name="category" value={form.category} onChange={handleChange}>
                                    {CATEGORIES.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Niveau *</label>
                                <select className="admin-input" name="proficiency_level" value={form.proficiency_level} onChange={handleChange}>
                                    {PROFICIENCY.map((p) => (
                                        <option key={p.value} value={p.value}>{p.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="admin-form-field">
                                <label className="admin-label">Ordre d'affichage</label>
                                <input className="admin-input" type="number" name="order" value={form.order} onChange={handleChange} min="0" placeholder="0" />
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

            {/* Filter tabs */}
            {!loading && items.length > 0 && (
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    <button
                        className={`admin-btn ${filterCat === "all" ? "admin-btn-primary" : "admin-btn-secondary"}`}
                        onClick={() => setFilterCat("all")}
                        style={{ fontSize: "0.78rem", padding: "0.35rem 0.8rem" }}
                    >
                        Toutes ({items.length})
                    </button>
                    {CATEGORIES.filter((c) => items.some((i) => i.category === c.value)).map((c) => (
                        <button
                            key={c.value}
                            className={`admin-btn ${filterCat === c.value ? "admin-btn-primary" : "admin-btn-secondary"}`}
                            onClick={() => setFilterCat(c.value)}
                            style={{ fontSize: "0.78rem", padding: "0.35rem 0.8rem" }}
                        >
                            {c.label} ({items.filter((i) => i.category === c.value).length})
                        </button>
                    ))}
                </div>
            )}

            <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                {loading ? (
                    <div className="admin-empty">Chargement...</div>
                ) : items.length === 0 ? (
                    <div className="admin-empty">Aucune compétence. Cliquez sur "Ajouter une compétence" pour commencer.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Compétence</th>
                                <th>Catégorie</th>
                                <th>Niveau</th>
                                <th style={{ width: 60 }}>Ordre</th>
                                <th style={{ width: 110 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => {
                                const pCfg = PROFICIENCY_COLOR[item.proficiency_level] || PROFICIENCY_COLOR.intermediate;
                                return (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                                        <td style={{ color: "#64748b", fontSize: "0.82rem" }}>{categoryLabel(item.category)}</td>
                                        <td>
                                            <span style={{ background: pCfg.bg, color: pCfg.color, padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
                                                {proficiencyLabel(item.proficiency_level)}
                                            </span>
                                        </td>
                                        <td style={{ color: "#94a3b8", textAlign: "center" }}>{item.order}</td>
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
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ManageSkills;
