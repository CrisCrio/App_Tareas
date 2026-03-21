import React, {useState, useContext} from "react";
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert} from "react-native";
import {AuthContext} from "../context/authContext";
import {loginService} from "../api/apiService";

const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    
    const handleLogin = async () => {
        if (!email || !password) return Alert.alert("Error", "completa todos los campos");
        
        setLoading(true);
        try{
            const data = await loginService(email, password);
            login(data.token); // Guarda el token en una variable global
        } catch (e){
            Alert.alert("Error de login", e.message);
        } finally {
            setLoading(false);
        }
    };
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Gestor de Tareas
            </Text>
            <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
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
                <ActivityIndicator size="large" color="#0000ff"/>
            ): (
                <Button title="Ingresar" onPress={handleLogin} color="#0000ff"/>
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
        backgroundColor: "#f0f0f0"
    },
    title:{
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40
    },
    input:{
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc"
    }
})

export default LoginScreen;