import React, { useState } from "react";
import API from "../../services/api";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("contacts/", formData);
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            alert("Failed to send message");
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Contact Me</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        name="message"
                        className="form-control"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Contact;
