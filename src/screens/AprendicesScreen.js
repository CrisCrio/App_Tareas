import React, { useEffect, useState, useContext } from "react";
import {
    View, Text, FlatList, StyleSheet, ActivityIndicator,
    Alert, TouchableOpacity, Platform, Image
} from "react-native";
import { AuthContext } from "../context/authContext";
import { getUsuariosService, cambiarRolService } from "../api/apiService";

const ROLES = ['aprendiz', 'instructor', 'coordinador'];

const AprendicesScreen = ({ navigation }) => {
    const { userToken, userProfile } = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const esCoordinador = userProfile?.rol === 'coordinador';

    const loadUsuarios = async () => {
        setLoading(true);
        try {
            const response = await getUsuariosService(userToken);
            setUsuarios(response.datos || []);
        } catch (e) {
            Alert.alert("Error", "No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    const handleCambiarRol = (uid, emailUsuario, rolActual) => {
        if (!esCoordinador) return;

        Alert.alert(
            `Cambiar rol de ${emailUsuario}`,
            `Rol actual: ${rolActual}\nSelecciona el nuevo rol:`,
            [
                ...ROLES.filter(r => r !== rolActual).map(rol => ({
                    text: rol.charAt(0).toUpperCase() + rol.slice(1),
                    onPress: async () => {
                        try {
                            await cambiarRolService(userToken, uid, rol);
                            Alert.alert("✅ Listo", `Rol cambiado a ${rol}`);
                            loadUsuarios(); // recarga la lista
                        } catch {
                            Alert.alert("Error", "No se pudo cambiar el rol");
                        }
                    }
                })),
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'coordinador': return { bg: "#FEF3C7", text: "#D97706" };
            case 'instructor':  return { bg: "#DBEAFE", text: "#2563EB" };
            default:            return { bg: "#F0FDF4", text: "#16A34A" };
        }
    };

    const getInitials = (email) => email ? email.charAt(0).toUpperCase() : "?";

    const renderUsuario = ({ item }) => {
        const colores = getRolColor(item.rol);
        return (
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    {item.foto_perfil ? (
                        <Image source={{ uri: item.foto_perfil }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitial}>{getInitials(item.email)}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.cardCenter}>
                    <Text style={styles.email}>{item.email}</Text>
                    <View style={[styles.rolBadge, { backgroundColor: colores.bg }]}>
                        <Text style={[styles.rolText, { color: colores.text }]}>
                            {item.rol}
                        </Text>
                    </View>
                </View>

                {esCoordinador && (
                    <TouchableOpacity
                        style={styles.editRolBtn}
                        onPress={() => handleCambiarRol(item.uid, item.email, item.rol)}
                    >
                        <Text style={styles.editRolText}>✏️</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Usuarios</Text>
                <View style={{ width: 70 }} />
            </View>

            {/* BADGE ROL ACTUAL */}
            <View style={styles.infoBar}>
                <Text style={styles.infoText}>
                    Tu rol: <Text style={styles.infoRol}>{userProfile?.rol || "—"}</Text>
                    {esCoordinador ? "  · Puedes cambiar roles ✏️" : ""}
                </Text>
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            ) : (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.uid}
                    renderItem={renderUsuario}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    header: {
        backgroundColor: "#4F46E5",
        paddingTop: Platform.OS === "ios" ? 55 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backBtn: { width: 70 },
    backText: { color: "#A5B4FC", fontSize: 14, fontWeight: "600" },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
    infoBar: {
        backgroundColor: "#EEF2FF",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 12,
        borderRadius: 12,
    },
    infoText: { color: "#4F46E5", fontSize: 13 },
    infoRol: { fontWeight: "700", textTransform: "capitalize" },
    listContent: { padding: 20, paddingBottom: 40 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    cardLeft: { marginRight: 12 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    avatarPlaceholder: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: "#4F46E5",
        justifyContent: "center", alignItems: "center",
    },
    avatarInitial: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    cardCenter: { flex: 1 },
    email: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginBottom: 5 },
    rolBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10, paddingVertical: 3,
        borderRadius: 20,
    },
    rolText: { fontSize: 12, fontWeight: "700", textTransform: "capitalize" },
    editRolBtn: {
        padding: 8, backgroundColor: "#EEF2FF",
        borderRadius: 10,
    },
    editRolText: { fontSize: 18 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AprendicesScreen;