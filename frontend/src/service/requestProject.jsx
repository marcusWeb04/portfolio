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

export async function projectCreate(project){
    try {
        const response = await fetch(`${API_BASE_URL}/api/project/create`,{
            method: "POST",
            headers: {
                accept: 'application/json',
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

export async function projectEdit(project){
    try {
        const response = await fetch(`${API_BASE_URL}/api/project/edit/${project.id}`,{
            method: "PUT",
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

export async function projectDelete(project){
     try {
        const response = await fetch(`${API_BASE_URL}/api/project/edit/${project.id}`,{
            method: "DELETE",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }   
}