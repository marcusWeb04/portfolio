import { useState } from "react";

function ProjectCard({project}){
    return(
        <div>
            <img src={project.img.link} alt={project.img.description} />
        </div>
    );
}

export default ProjectCard;
 