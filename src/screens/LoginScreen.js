import React, {useState, useContext} from "react";
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from "react-native";
import {loginService} from "../api/apiService";
import {AuthContext} from "../context/authContext";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert("Error", "Completa todos los campos");
        }

        setLoading(true);

        try {
            const data = await loginService(email, password);
            login(data.token || data.access);
        } catch (e) {
            Alert.alert("Error de login", e.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                ADSO Gestor de Tareas
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Iniciar Sesión" onPress={handleLogin} color="#0000ff"/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title:{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#0000ff", // Corregido: era "colo"
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: "#0000ff",
        marginBottom: 20,
        padding: 10,
        width: "100%",
    }
});

export default LoginScreen;