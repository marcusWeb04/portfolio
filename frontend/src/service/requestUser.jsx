import {API_BASE_URL} from "./api";

export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return false;
  }
}

export async function logOut(){
  try {
    const response = await fetch(`${API_BASE_URL}/api/logout`,{
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }
  } catch (error) {
    console.error("Erreur API:", error);
    return false;
  }
}

// fetch('http://127.0.0.1:8000/api/nom-de-la-route', {
//   credentials: 'include',
// })