import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000/api"; 
// Si usas celular físico: http://TU_IP_LOCAL:8000/api

export const loginService = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al iniciar sesión");
        }

        return data;

    } catch (error) {
        throw error;
    }
};

export const getTasksService = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/tareas/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('No se pudieron obtener las tareas');

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const taskApiService = {
    // LISTAR TAREAS
    getAll: async (token) => {
        const response = await fetch(`${BASE_URL}/tareas/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return await response.json();
    },

    // CREAR TAREA
    create: async (token, task) => {
        const response = await fetch(`${BASE_URL}/tareas/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(task)
        });

        return await response.json();
    },

    // EDITAR
    update: async (token, id, data) => {
        const response = await fetch(`${BASE_URL}/tareas/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    },

    // ELIMINAR
    delete: async (token, id) => {
        const response = await fetch(`${BASE_URL}/tareas/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar tarea");
        }
    }
};