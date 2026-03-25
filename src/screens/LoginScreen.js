import React, { useState, useContext } from "react";
import {
    View, Text, TextInput, StyleSheet,
    ActivityIndicator, Alert, TouchableOpacity, Platform
} from "react-native";
import { AuthContext } from "../context/authContext";
import { loginService } from "../api/apiService";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) return Alert.alert("Error", "Completa todos los campos");

        setLoading(true);
        try {
            const data = await loginService(email, password);
            await login(data.token);        // guarda el token
            navigation.replace("Home");     // ✅ navega sin poder volver atrás
        } catch (e) {
            Alert.alert("Error de login", e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.appName}>
                    MiApp<Text style={styles.appNameAccent}>Tareas</Text>
                </Text>
                <Text style={styles.tagline}>Organiza tu día</Text>
            </View>

            {/* FORM */}
            <View style={styles.formCard}>
                <Text style={styles.formTitle}>Iniciar sesión</Text>

                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tu contraseña"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 20 }} />
                ) : (
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginBtnText}>Ingresar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    header: {
        backgroundColor: "#4F46E5",
        paddingTop: Platform.OS === "ios" ? 80 : 60,
        paddingBottom: 50,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        alignItems: "center",
    },
    appName: {
        fontSize: 32,
        fontWeight: "900",
        color: "#fff",
        letterSpacing: 0.5,
    },
    appNameAccent: {
        color: "#A5B4FC",
    },
    tagline: {
        color: "#C7D2FE",
        fontSize: 14,
        marginTop: 6,
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        margin: 24,
        marginTop: 40,
        padding: 28,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 24,
        textAlign: "center",
    },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#475569",
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 13,
        fontSize: 15,
        color: "#1E293B",
        borderWidth: 1.5,
        borderColor: "transparent",
    },
    loginBtn: {
        backgroundColor: "#4F46E5",
        marginTop: 28,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 5,
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});

export default LoginScreen;