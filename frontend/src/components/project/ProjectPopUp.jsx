function ProjectPopUp({ project, onClose }) {
  const handleOverlayClick = (element) => {
    if (element.target === element.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
        >
          ❌
        </button>
        <img
          src={project?.img?.link}
          alt={project?.img?.description || "Image du projet"}
          className="w-full h-auto rounded"
        />
        <h2 className="text-xl font-bold mt-4">{project.title}</h2>
        <p>{project?.description}</p>
      </div>
    </div>
  );
}

export default ProjectPopUp;