import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { FaTrash, FaEnvelope, FaUser, FaClock, FaInbox } from "react-icons/fa";

function ManageContacts() {
    const [items, setItems]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = () =>
        API.get("contacts/").then((r) => {
            const sorted = [...r.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setItems(sorted);
        }).finally(() => setLoading(false));

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce message ?")) return;
        await API.delete(`contacts/${id}/`);
        if (selected?.id === id) setSelected(null);
        fetchItems();
    };

    const formatDate = (iso) => {
        if (!iso) return "";
        return new Date(iso).toLocaleString("fr-FR", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Messages reçus</h1>
                <span style={{ background: "#f1f5f9", color: "#475569", padding: "0.35rem 0.8rem", borderRadius: 20, fontSize: "0.82rem", fontWeight: 600 }}>
                    {items.length} message{items.length !== 1 ? "s" : ""}
                </span>
            </div>

            {loading ? (
                <div className="admin-empty">Chargement...</div>
            ) : items.length === 0 ? (
                <div className="admin-card">
                    <div className="admin-empty" style={{ padding: "3rem" }}>
                        <FaInbox size={32} style={{ color: "#cbd5e1", marginBottom: "0.75rem" }} />
                        <div>Aucun message pour le moment.</div>
                    </div>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1.4fr" : "1fr", gap: "1rem", alignItems: "start" }}>
                    {/* List */}
                    <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Expéditeur</th>
                                    <th>Date</th>
                                    <th style={{ width: 60 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => setSelected(item)}
                                        style={{
                                            cursor: "pointer",
                                            background: selected?.id === item.id ? "rgba(99,102,241,0.05)" : undefined,
                                            borderLeft: selected?.id === item.id ? "3px solid #6366f1" : "3px solid transparent",
                                        }}
                                    >
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.name}</div>
                                            <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{item.email}</div>
                                        </td>
                                        <td style={{ color: "#94a3b8", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <button className="admin-btn admin-btn-danger admin-btn-icon" onClick={() => handleDelete(item.id)} title="Supprimer">
                                                <FaTrash size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Detail panel */}
                    {selected && (
                        <div className="admin-card" style={{ position: "sticky", top: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Détail du message</h3>
                                <button className="admin-btn admin-btn-secondary admin-btn-icon" onClick={() => setSelected(null)} title="Fermer">
                                    ×
                                </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                                <MetaRow icon={<FaUser size={11} />} label="Nom" value={selected.name} />
                                <MetaRow icon={<FaEnvelope size={11} />} label="Email" value={
                                    <a href={`mailto:${selected.email}`} style={{ color: "#6366f1", textDecoration: "none" }}>{selected.email}</a>
                                } />
                                <MetaRow icon={<FaClock size={11} />} label="Reçu le" value={formatDate(selected.created_at)} />
                            </div>

                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 0.6rem" }}>Message</p>
                                <p style={{ color: "#334155", fontSize: "0.9rem", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                                    {selected.message}
                                </p>
                            </div>

                            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem" }}>
                                <a
                                    href={`mailto:${selected.email}?subject=Re: votre message`}
                                    className="admin-btn admin-btn-primary"
                                    style={{ textDecoration: "none", fontSize: "0.82rem" }}
                                >
                                    <FaEnvelope size={11} /> Répondre
                                </a>
                                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(selected.id)} style={{ fontSize: "0.82rem" }}>
                                    <FaTrash size={11} /> Supprimer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function MetaRow({ icon, label, value }) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <span style={{ color: "#94a3b8", marginTop: 2 }}>{icon}</span>
            <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>{label} </span>
                <span style={{ fontSize: "0.875rem", color: "#334155" }}>{value}</span>
            </div>
        </div>
    );
}

export default ManageContacts;
