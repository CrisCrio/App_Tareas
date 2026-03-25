import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

// ⚠️ Sin /api al final porque ya está en la URL de perfil
const BASE_URL = "http://192.168.1.6:8000";

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null); // ✅ faltaba esto

    const login = async (token) => {
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);

        try {
            const response = await fetch(`${BASE_URL}/api/perfil/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setUserProfile({
                email: data.email || "Sin email",
                rol: data.rol || "aprendiz",
                foto_perfil: data.foto_perfil || null,
            });
        } catch (e) {
            try {
                const base64Payload = token.split('.')[1];
                const payload = JSON.parse(atob(base64Payload));
                setUserProfile({ email: payload.email || "Sin email", rol: "aprendiz", foto_perfil: null });
            } catch {
                setUserProfile({ email: "Sin email", rol: "aprendiz", foto_perfil: null });
            }
        }
    };

    const logout = async () => {
        setUserToken(null);
        setUserProfile(null); // ✅ limpia el perfil al cerrar sesión
        await AsyncStorage.removeItem('userToken');
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setUserToken(token);
                // ✅ Restaura el perfil si ya había sesión guardada
                try {
                    const response = await fetch(`${BASE_URL}/api/perfil/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = await response.json();
                    setUserProfile({
                        email: data.email || "Sin email",
                        rol: data.rol || "aprendiz",
                        foto_perfil: data.foto_perfil || null,
                    });
                } catch {
                    const base64Payload = token.split('.')[1];
                    const payload = JSON.parse(atob(base64Payload));
                    setUserProfile({ email: payload.email || "Sin email", rol: "aprendiz", foto_perfil: null });
                }
            }
        } catch (e) {
            console.log("Error en persistencia: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        // ✅ ahora expone userProfile y setUserProfile
        <AuthContext.Provider value={{ login, logout, userToken, isLoading, userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};