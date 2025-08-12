import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Aside from "../../../components/backoffice/aside";
import Form from "../../../components/backoffice/project/Form.jsx";
import ProjectPopUp from "../../../components/project/ProjectPopUp.jsx";
import { getProjectPagination } from "../../../service/requestProject";

function ProjectPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [content, setContent] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleRequest = async () => {
      const data = await getProjectPagination({ page, limit });
      setContent(data);
      console.log(data);
    };
    handleRequest();
  }, [page, limit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour filtrer par catégorie etc.
  };

  // Détermine quelle action envoyer au formulaire
  const formChildren = deleteProject
    ? { action: "delete", project: deleteProject }
    : editingProject
    ? { action: "update", project: editingProject }
    : { action: "add" };

  // Fonction pour fermer le formulaire et réinitialiser les états associés
  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setDeleteProject(null);
  };

  return (
    <div className="flex">
      <Aside />
      <div className="flex flex-col h-[100vh] w-full">
        <div className="flex items-center space-x-4 mb-4">
          <form
            action="#"
            className="w-[20%] ml-[5%] flex items-center space-x-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="Categorie">Catégories</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              name="categorie"
              id="categorie"
            >
              <option value="">Toutes</option>
              <option value="guitar">Guitare</option>
              <option value="piano">Piano</option>
              <option value="drums">Batterie</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Valider
            </button>
          </form>

          <button
            className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
            onClick={() => {
              setEditingProject(null);
              setDeleteProject(null);
              setShowForm(true);
            }}
          >
            Ajouter
          </button>
        </div>

        {/* Tableau des projets */}
        <table className="border-collapse w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Id</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Aperçu</th>
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {content.map((project) => (
              <tr
                key={project.id}
                className="h-[5vh] border-b border-gray-200 cursor-pointer"
              >
                <td className="text-center">{project.id}</td>
                <td className="text-center">{project.title}</td>
                <td className="text-center">{project.description}</td>
                <td className="text-center">
                  <button onClick={() => setSelectedProject(project)}>
                    Aperçu
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setDeleteProject(null);
                      setShowForm(true);
                    }}
                  >
                    Modifier
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setDeleteProject(project);
                      setEditingProject(null);
                      setShowForm(true);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup aperçu */}
        {selectedProject && (
          <ProjectPopUp
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Formulaire d'ajout/modification/suppression */}
        {showForm && (
          <Form onClose={closeForm} children={formChildren} />
        )}

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-auto p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-center">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
