import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import Aside from "../../../components/backoffice/aside";
import ProjectPopUp from "../../../components/project/ProjectPopUp.jsx";
import { getProjectPagination } from "../../../service/requestProject";

function ProjectPage(){
    const navigate = useNavigate();
    const [page,setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const [content, setContent] = useState([]);
    const [projectType, setProjectType] = useState('Tout');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(()=>{
        const handleRequest = async () => {
            const data = await getProjectPagination({page,limit});
            setContent(data);
            console.log(data);
        };
        handleRequest();
    },[page]);
    

    return (
        <div className="flex">
            <Aside />
            <div className="flex flex-col h-[95vh] w-full">
                <table className="border-collapse">
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
                            <button onClick={() => setSelectedProject(project)}>Aperçu</button>
                          </td>
                          <td className="text-center">
                            <button onClick={(element) => {
                              element.stopPropagation();
                              navigate(`/projects/edit/${project.id}`);
                            }}>Modifier</button>
                          </td>
                          <td className="text-center">
                            <button onClick={(e) => {
                              element.stopPropagation();
                              console.log("Supprimer", project.id);
                            }}>Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>

                {/* PopUp affiché conditionnellement */}
                {selectedProject && (
                  <ProjectPopUp
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                  />
                )}

                {/* Pagination */}
                <div className="flex justify-center space-x-2 mt-auto">
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