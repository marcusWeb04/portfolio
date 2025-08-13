import {API_BASE_URL} from "./api";

export async function getProjectByType({ projectType, limit }) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/find`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify({
                categories: projectType,
                limit: limit,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }
}

export async function getProjectPagination({page,limit}){
        try {
        const response = await fetch(`${API_BASE_URL}/api/project/info`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify({
                page: page,
                limit: limit,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }
}

export async function projectCreate({ project }) {
  try {
    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("link", project.link);
    formData.append("description", project.description);
    if (project.image) {
      formData.append("image", project.image); // ton File
    }

    // Si tu as un tableau de catégories (ex: [1, 2, 3])
    project.categories?.forEach((catId, index) => {
      formData.append(`categories[${index}]`, catId);
    });

    const response = await fetch(`${API_BASE_URL}/api/project/create`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

export async function projectEdit(project){
    try {
        const response = await fetch(`${API_BASE_URL}/api/project/edit/${project.id}`,{
            method: "PUT",
            credentials: 'include',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    "title" : project.title,
                    "link" : project.link,
                    "description" : project.description,
                    "categories" : project.categories,
                }
            ),
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }
}

export async function projectDelete(id){
     try {
        const response = await fetch(`${API_BASE_URL}/api/project/delete/${id}`,{
            method: "DELETE",
            credentials: 'include',
            headers: {
                accept: 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }   
}