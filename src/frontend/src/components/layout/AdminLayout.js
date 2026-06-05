import React, { useContext, useState } from "react";
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
    FaTachometerAlt, FaUser, FaCode, FaGraduationCap,
    FaBriefcase, FaTools, FaEnvelope, FaSignOutAlt, FaGlobe, FaBars, FaTimes,
} from "react-icons/fa";
import Dashboard        from "../../pages/admin/Dashboard";
import ManageProfile    from "../../pages/admin/ManageProfile";
import ManageProjects   from "../../pages/admin/ManageProjects";
import ManageEducation  from "../../pages/admin/ManageEducation";
import ManageExperience from "../../pages/admin/ManageExperience";
import ManageSkills     from "../../pages/admin/ManageSkills";
import ManageContacts   from "../../pages/admin/ManageContacts";
import "./admin.css";

const NAV = [
    { to: "/admin/dashboard",   label: "Dashboard",   icon: <FaTachometerAlt size={13} /> },
    { to: "/admin/profile",     label: "Profil",      icon: <FaUser size={13} /> },
    { to: "/admin/projects",    label: "Projets",     icon: <FaCode size={13} /> },
    { to: "/admin/education",   label: "Formation",   icon: <FaGraduationCap size={13} /> },
    { to: "/admin/experience",  label: "Expérience",  icon: <FaBriefcase size={13} /> },
    { to: "/admin/skills",      label: "Compétences", icon: <FaTools size={13} /> },
    { to: "/admin/contacts",    label: "Messages",    icon: <FaEnvelope size={13} /> },
];

function AdminLayout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sideOpen, setSideOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const closeSide = () => setSideOpen(false);

    return (
        <div className="admin-wrapper">
            {/* ── Mobile top bar ── */}
            <div className="admin-topbar">
                <button className="admin-hamburger" onClick={() => setSideOpen(!sideOpen)} aria-label="Menu">
                    {sideOpen ? <FaTimes size={18} color="white" /> : <FaBars size={18} color="white" />}
                </button>
                <span className="sidebar-logo-text" style={{ fontSize: "0.9rem" }}>Admin Panel</span>
                <div style={{ width: 36 }} />
            </div>

            {/* ── Overlay (mobile) ── */}
            {sideOpen && <div className="admin-overlay" onClick={closeSide} />}

            {/* ── Sidebar ── */}
            <aside className={`admin-sidebar${sideOpen ? " open" : ""}`}>
                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">IC</div>
                    <span className="sidebar-logo-text">Ibrahima Camara</span>
                    <span className="sidebar-logo-sub">Admin Panel</span>
                </div>

                <nav className="sidebar-nav">
                    <p className="sidebar-section-label">Navigation</p>
                    {NAV.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeSide}
                            className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}

                    <p className="sidebar-section-label" style={{ marginTop: "0.75rem" }}>Autre</p>
                    <Link to="/" className="sidebar-link" onClick={closeSide}>
                        <span className="sidebar-icon"><FaGlobe size={13} /></span>
                        Voir le site
                    </Link>
                    <button className="sidebar-link" onClick={handleLogout}>
                        <span className="sidebar-icon"><FaSignOutAlt size={13} /></span>
                        Déconnexion
                    </button>
                </nav>
            </aside>

            {/* ── Main content ── */}
            <main className="admin-main">
                <Routes>
                    <Route path="dashboard"  element={<Dashboard />} />
                    <Route path="profile"    element={<ManageProfile />} />
                    <Route path="projects"   element={<ManageProjects />} />
                    <Route path="education"  element={<ManageEducation />} />
                    <Route path="experience" element={<ManageExperience />} />
                    <Route path="skills"     element={<ManageSkills />} />
                    <Route path="contacts"   element={<ManageContacts />} />
                    <Route path="*"          element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
}

export default AdminLayout;
