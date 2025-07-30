function ProjectCard({ project }) {
    const { title, img } = project;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition-shadow duration-300">
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
