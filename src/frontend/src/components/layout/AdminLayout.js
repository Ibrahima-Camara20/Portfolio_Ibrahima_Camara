import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../../pages/admin/Dashboard";
import ManageProjects from "../../pages/admin/ManageProjects";

function AdminLayout() {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky pt-3">
                        <h5 className="px-3">Admin Panel</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/projects">
                                    Manage Projects
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Back to Site
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3">
                        <Routes>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="projects" element={<ManageProjects />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
