import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    API.get("projects/").then((res) => setProjects(res.data));
  };

  const deleteProject = (id) => {
    API.delete(`projects/${id}/`).then(() => fetchProjects());
  };

  return (
    <div>
      <h2>Manage Projects</h2>
      {projects.map((p) => (
        <div key={p.id} className="card p-3 mb-2">
          {p.title}
          <button
            className="btn btn-danger btn-sm float-end"
            onClick={() => deleteProject(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageProjects;
