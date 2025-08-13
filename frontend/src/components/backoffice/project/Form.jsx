import { useState, useEffect } from "react";
import { projectCreate,projectEdit,projectDelete } from "../../../service/requestProject";

export default function Form({ children, onClose }) {
  const [project, setProject] = useState({
    image: null,
    title: "",
    description: "",
  });

  // Mise à jour de l'état quand on ouvre le formulaire
  useEffect(() => {
    if (children.action === "update" && children.project) {
      setProject({
        image: null, // on ne peut pas préremplir un fichier
        title: children.project.title || "",
        description: children.project.description || "",
      });
    }
    if (children.action === "add") {
      setProject({
        image: null,
        title: "",
        description: "",
      });
    }
  }, [children]);

  // Ferme le modal si on clique en dehors du formulaire
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Met à jour l'état à chaque changement dans les champs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProject((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Ici tu peux envoyer les données (ex: API, state parent...)
        console.log("Projet soumis :", project);
        
        onClose(); // fermer le formulaire après soumission (optionnel)   
    } catch (error) {
        
    }
  };

  // Suppresion du projet
  const handleDelete = async () =>{
    try {
        // Logique suppression ici
        console.log("Projet supprimé :", children.project);
        await projectDelete(children.project.id);
        onClose();
    } catch (error) {
        console.log(error);
    }
  }   

  // Contenu du formulaire selon l'action
  const content = () => {
    if (children.action === "add" || children.action === "update") {
      return (
        <>
          {/* Champ fichier */}
          <div className="w-full h-auto rounded">
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </div>

          {/* Titre */}
          <div className="text-xl font-bold mt-4">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {children.action === "add" ? "Ajouter" : "Mettre à jour"}
          </button>
        </>
      );
    } else if (children.action === "delete") {
      return (
        <>
          <div className="w-full h-auto rounded">
            <p>
              Êtes-vous sûr de vouloir supprimer le projet{" "}
              {children.project?.title} ?
            </p>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={() => {
                handleDelete()
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Oui
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Non
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <form
        method="POST"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
        >
          ❌
        </button>
        {content()}
      </form>
    </div>
  );
}
