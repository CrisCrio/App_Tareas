import React, { useContext } from "react";
import {
    View, Text, StyleSheet, Image,
    ScrollView, TouchableOpacity
} from "react-native";
import { AuthContext } from "../context/authContext";

const DashboardScreen = ({ navigation }) => {
    const { userData, logout } = useContext(AuthContext);

    const email = userData?.email || "Sin email";
    const rol = userData?.rol || "Sin rol";
    const foto = userData?.foto; // URL que viene del API

    return (
        <ScrollView style={styles.container}>

            {/* Botón volver */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Mi Perfil</Text>

            {/* Tarjeta de perfil */}
            <View style={styles.profileCard}>

                {/* Foto — si no hay URL muestra fallback */}
                {foto ? (
                    <Image
                        source={{Avatar }} 
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Text style={styles.avatarFallbackText}>👤</Text>
                    </View>
                )}

                {/* Email */}
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📧 Email</Text>
                        <Text style={styles.infoValue}>{email}</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Rol */}
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>🎭 Rol</Text>
                        <View style={styles.rolBadge}>
                            <Text style={styles.rolText}>{rol}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutText}>🚪 Cerrar sesión</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20
    },
    backBtn: {
        marginTop: 50,
        marginBottom: 10
    },
    backText: {
        fontSize: 16,
        color: "#4a90e2",
        fontWeight: "600"
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#222"
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        marginBottom: 30
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 24,
        borderWidth: 3,
        borderColor: "#4a90e2"
    },
    avatarFallback: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#e8f0fe",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        borderWidth: 3,
        borderColor: "#4a90e2"
    },
    avatarFallbackText: {
        fontSize: 50
    },
    infoSection: {
        width: "100%"
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12
    },
    infoLabel: {
        fontSize: 15,
        color: "#888",
        fontWeight: "600"
    },
    infoValue: {
        fontSize: 15,
        color: "#222",
        fontWeight: "500",
        flexShrink: 1,
        textAlign: "right",
        marginLeft: 12
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f0"
    },
    rolBadge: {
        backgroundColor: "#e8f0fe",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    rolText: {
        color: "#4a90e2",
        fontWeight: "bold",
        fontSize: 14,
        textTransform: "capitalize"
    },
    logoutBtn: {
        backgroundColor: "#fff0f0",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 40,
        borderWidth: 1,
        borderColor: "#ffcccc"
    },
    logoutText: {
        fontSize: 16,
        color: "#e74c3c",
        fontWeight: "bold"
    }
});

export default DashboardScreen;