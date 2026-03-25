import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔧 Cambia esta IP por la tuya local (resultado de `ipconfig`)
const BASE_URL = "http://192.168.1.6:8000/api";


// ─────────────────────────────────────────────
// TAREAS
// ─────────────────────────────────────────────

export const getTasksService = async (token) => {
    const response = await fetch(`${BASE_URL}/tareas/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("No se pudieron obtener las tareas");
    return await response.json();
};

export const taskApiService = {
    getAll: async (token) => {
        const response = await fetch(`${BASE_URL}/tareas/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return await response.json();
    },

    create: async (token, task) => {
        const response = await fetch(`${BASE_URL}/tareas/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        return await response.json();
    },

    update: async (token, id, data) => {
        const response = await fetch(`${BASE_URL}/tareas/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },

    delete: async (token, id) => {
        const response = await fetch(`${BASE_URL}/tareas/${id}/`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al eliminar tarea");
    },
};


export const getProfileService = async (token) => {
    // Decodifica el JWT de Firebase para obtener email y uid
    // El token de Firebase es un JWT, su payload está en la parte del medio
    try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        return {
            email: payload.email || "Sin email",
            rol: payload.rol || "usuario",
            foto_perfil: null, // se carga aparte si existe
        };
    } catch {
        return { email: "Sin email", rol: "usuario", foto_perfil: null };
    }
};

export const uploadProfileImageService = async (token, imageAsset) => {
    const formData = new FormData();
    formData.append("file", {           // ✅ "file" no "imagen"
        uri: imageAsset.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
    });

    const response = await fetch(`${BASE_URL}/perfil/imagen/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (!response.ok) throw new Error("Error al subir imagen");
    const data = await response.json();
    
    // Tu backend devuelve { url: "..." } no { foto_perfil: "..." }
    return { foto_perfil: data.url };
};

export const loginService = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al iniciar sesión");
    return data;
};

// Listar usuarios (coordinador e instructor)
export const getUsuariosService = async (token, rol = null) => {
    const url = rol
        ? `${BASE_URL}/usuarios/?rol=${rol}`
        : `${BASE_URL}/usuarios/`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("No se pudieron obtener los usuarios");
    return await response.json();
};

// Cambiar rol de un usuario (solo coordinador)
export const cambiarRolService = async (token, uid, nuevoRol) => {
    const response = await fetch(`${BASE_URL}/usuarios/${uid}/rol/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rol: nuevoRol }),
    });
    if (!response.ok) throw new Error("No se pudo cambiar el rol");
    return await response.json();
};