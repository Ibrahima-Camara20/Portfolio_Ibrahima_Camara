import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/user/Home";
import Projects from "./pages/user/Projects";
import Contact from "./pages/user/Contact";
import Education from "./pages/user/Education";
import Experience from "./pages/user/Experience";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";

function App() {
  const [language, setLanguage] = useState("fr");

  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route
          path="/*"
          element={
            <>
              <Navbar language={language} setLanguage={setLanguage} />
              <Routes>
                <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/education" element={<Education />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
