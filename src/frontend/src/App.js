import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./i18n"; // Initialise i18next au démarrage

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/user/Home";
import Projects from "./pages/user/Projects";
import Contact from "./pages/user/Contact";
import MyContacts from "./pages/user/MyContacts";
import Education from "./pages/user/Education";
import Experience from "./pages/user/Experience";

import Login from "./pages/admin/Login";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* USER */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/education" element={<Education />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mes-contacts" element={<MyContacts />} />
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
