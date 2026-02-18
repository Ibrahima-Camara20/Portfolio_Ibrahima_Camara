import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("access");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Projects
export const getProjects = () => API.get("projects/");

// Education
export const getEducation = () => API.get("education/");

// Experiences
export const getExperiences = () => API.get("experiences/");

// Skills
export const getSkills = () => API.get("skills/");

// Contacts
export const createContact = (data) => API.post("contacts/", data);

export default API;

