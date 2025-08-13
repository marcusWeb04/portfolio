import { useMemo, useState } from "react";

function ProjectCard({ project, onClick }) {
    const { title, img } = project;
    const [styleShadow, setStyleShadow] = useState("79, 70, 229");

    const boxShadow = useMemo(() => {
        return `
            rgba(${styleShadow}, 0.4) 10px 10px,
            rgba(${styleShadow}, 0.3) 20px 20px,
            rgba(${styleShadow}, 0.2) 30px 30px,
            rgba(${styleShadow}, 0.1) 35px 35px,
            rgba(${styleShadow}, 0.05) 40px 40px
        `;
    }, [styleShadow]); // recalcul seulement si la couleur change

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition-shadow duration-300"
            style={{ boxShadow }}
            onClick={onClick}
        >
            {img?.link ? (
                <img
                    src={img.link}
                    alt={img.description || "Aperçu du projet"}
                    className="w-full h-48 object-cover"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    Pas d'image
                </div>
            )}
            <div className="p-4">
                <h4 className="text-lg font-semibold">{title}</h4>
            </div>
        </div>
    );
}

export default ProjectCard;
