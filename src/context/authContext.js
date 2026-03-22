import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null); // 👈 NUEVO
    const [isLoading, setIsLoading] = useState(true);

    const login = async (token, user) => { // 👈 ahora recibe user también
        setUserToken(token);
        setUserData(user);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user)); // 👈 persiste
    };

    const logout = async () => {
        setUserToken(null);
        setUserData(null);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const user = await AsyncStorage.getItem('userData');
            setUserToken(token);
            setUserData(user ? JSON.parse(user) : null);
        } catch (e) {
            console.log("Error en persistencia: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn(); // ✅ nombre correcto
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, userToken, userData, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};