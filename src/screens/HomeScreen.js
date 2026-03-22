import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/authContext";

const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>Hola desarrollador 👋</Text>
                <Text style={styles.sub}>Bienvenido al panel principal</Text>
            </View>

            <View style={styles.menuGrid}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Tasks")}
                >
                    <Text style={styles.cardIcon}>📋</Text>
                    <Text style={styles.cardText}>Mis Tareas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Dashboard")} // 👈 NUEVO
                >
                    <Text style={styles.cardIcon}>📊</Text>
                    <Text style={styles.cardText}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.cardLogout]}
                    onPress={logout}
                >
                    <Text style={styles.cardIcon}>🚪</Text>
                    <Text style={styles.cardText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0"
    },
    header: {
        marginTop: 60,
        marginBottom: 30,
        alignItems: "center"
    },
    welcome: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    sub: {
        fontSize: 16,
        color: "#666",
        marginTop: 6,
        textAlign: "center"
    },
    menuGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 16
    },
    card: {
        width: "40%",
        height: 150,
        backgroundColor: "#fff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardLogout: {
        backgroundColor: "#fff0f0"
    },
    cardIcon: {
        fontSize: 40,
        marginBottom: 10
    },
    cardText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default HomeScreen;