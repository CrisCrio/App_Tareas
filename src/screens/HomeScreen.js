import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { AuthContext } from "../context/authContext";

const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.appName}>
                    MiApp<Text style={styles.appNameAccent}>Tareas</Text>
                </Text>
                <Text style={styles.subtitle}>Panel principal</Text>
            </View>

            {/* GREETING */}
            <View style={styles.greetingCard}>
                <Text style={styles.greetingIcon}>👋</Text>
                <Text style={styles.greetingText}>¡Bienvenido!</Text>
                <Text style={styles.greetingSub}>¿Qué quieres hacer hoy?</Text>
            </View>

            {/* MENU */}
            <View style={styles.grid}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#EEF2FF" }]}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.cardIcon}>👤</Text>
                    <Text style={styles.cardLabel}>Mi Perfil</Text>
                    <Text style={styles.cardSub}>Ver dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#F0FDF4" }]}
                    onPress={() => navigation.navigate("Tasks")}
                >
                    <Text style={styles.cardIcon}>📋</Text>
                    <Text style={styles.cardLabel}>Mis Tareas</Text>
                    <Text style={styles.cardSub}>Ver y gestionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#FFF7ED" }]}
                    onPress={() => navigation.navigate("TaskForm", { task: null })}
                >
                    <Text style={styles.cardIcon}>➕</Text>
                    <Text style={styles.cardLabel}>Nueva Tarea</Text>
                    <Text style={styles.cardSub}>Crear ahora</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#FEF2F2" }]}
                    onPress={logout}
                >
                    <Text style={styles.cardIcon}>🚪</Text>
                    <Text style={styles.cardLabel}>Cerrar Sesión</Text>
                    <Text style={styles.cardSub}>Salir de la app</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#F0F9FF" }]}
                    onPress={() => navigation.navigate("Aprendices")}
                >
                    <Text style={styles.cardIcon}>👥</Text>
                    <Text style={styles.cardLabel}>Usuarios</Text>
                    <Text style={styles.cardSub}>Ver registro</Text>
                </TouchableOpacity>
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
        paddingTop: Platform.OS === "ios" ? 55 : 40,
        paddingBottom: 30,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    appName: {
        fontSize: 26,
        fontWeight: "900",
        color: "#fff",
        letterSpacing: 0.3,
    },
    appNameAccent: {
        color: "#A5B4FC",
    },
    subtitle: {
        color: "#C7D2FE",
        fontSize: 14,
        marginTop: 2,
    },
    greetingCard: {
        alignItems: "center",
        marginTop: 28,
        marginBottom: 8,
    },
    greetingIcon: { fontSize: 40, marginBottom: 8 },
    greetingText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1E293B",
    },
    greetingSub: {
        fontSize: 14,
        color: "#94A3B8",
        marginTop: 4,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
        gap: 14,
        marginTop: 10,
    },
    card: {
        width: "47%",
        borderRadius: 18,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardIcon: { fontSize: 32, marginBottom: 10 },
    cardLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 2,
    },
    cardSub: {
        fontSize: 12,
        color: "#94A3B8",
    },
});

export default HomeScreen;