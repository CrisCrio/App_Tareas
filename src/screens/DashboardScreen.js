import React, { useContext, useState, useEffect } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, ActivityIndicator, Alert, ScrollView,
    Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/authContext";
import { getProfileService, uploadProfileImageService } from "../api/apiService";

const DashboardScreen = ({ navigation }) => {
    const { logout, userToken } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(false);

    const loadProfile = async () => {
        try {
            const data = await getProfileService(userToken);
            setProfile(data);
        } catch (e) {
            console.error("Error al cargar perfil:", e);
        } finally {
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Necesitamos acceso a tu galería para cambiar la foto.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setUploadingImage(true);
            try {
                const updated = await uploadProfileImageService(userToken, asset);
                setProfile((prev) => ({ ...prev, foto_perfil: updated.foto_perfil }));
                Alert.alert("✅ Listo", "Foto de perfil actualizada.");
            } catch (e) {
                Alert.alert("Error", "No se pudo subir la imagen.");
            } finally {
                setUploadingImage(false);
            }
        }
    };

    const getInitials = (email) => {
        if (!email) return "?";
        return email.charAt(0).toUpperCase();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.appName}>MiApp<Text style={styles.appNameAccent}>Tareas</Text></Text>
                    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                        <Text style={styles.logoutText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* PROFILE CARD */}
            <View style={styles.profileCard}>
                <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage} disabled={uploadingImage}>
                    {uploadingImage ? (
                        <View style={styles.avatarPlaceholder}>
                            <ActivityIndicator color="#fff" />
                        </View>
                    ) : profile?.foto_perfil ? (
                        <Image source={{ uri: profile.foto_perfil }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitial}>
                                {getInitials(profile?.email)}
                            </Text>
                        </View>
                    )}
                    <View style={styles.cameraIcon}>
                        <Text style={styles.cameraEmoji}>📷</Text>
                    </View>
                </TouchableOpacity>

                {loadingProfile ? (
                    <ActivityIndicator color="#4F46E5" style={{ marginTop: 12 }} />
                ) : (
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileEmail}>{profile?.email || "—"}</Text>
                        <View style={styles.rolBadge}>
                            <Text style={styles.rolText}>{profile?.rol || "usuario"}</Text>
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.changePhotoBtn} onPress={handlePickImage}>
                    <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
                </TouchableOpacity>
            </View>

            {/* STATS ROW */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>📋</Text>
                    <Text style={styles.statLabel}>Tareas</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>✅</Text>
                    <Text style={styles.statLabel}>Completadas</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>⏳</Text>
                    <Text style={styles.statLabel}>Pendientes</Text>
                </View>
            </View>

            {/* NAV MENU */}
            <Text style={styles.sectionTitle}>Menú principal</Text>

            <View style={styles.menuGrid}>
                <TouchableOpacity
                    style={[styles.menuCard, { backgroundColor: "#EEF2FF" }]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.menuIcon}>🏠</Text>
                    <Text style={styles.menuLabel}>Inicio</Text>
                    <Text style={styles.menuSub}>Panel principal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuCard, { backgroundColor: "#F0FDF4" }]}
                    onPress={() => navigation.navigate("Tasks")}
                >
                    <Text style={styles.menuIcon}>📋</Text>
                    <Text style={styles.menuLabel}>Mis Tareas</Text>
                    <Text style={styles.menuSub}>Ver y gestionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuCard, { backgroundColor: "#FFF7ED" }]}
                    onPress={() => navigation.navigate("TaskForm", { task: null })}
                >
                    <Text style={styles.menuIcon}>➕</Text>
                    <Text style={styles.menuLabel}>Nueva Tarea</Text>
                    <Text style={styles.menuSub}>Crear tarea</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuCard, { backgroundColor: "#FDF2F8" }]}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.menuIcon}>👤</Text>
                    <Text style={styles.menuLabel}>Perfil</Text>
                    <Text style={styles.menuSub}>Mi cuenta</Text>
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

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // HEADER
    header: {
        backgroundColor: "#4F46E5",
        paddingTop: Platform.OS === "ios" ? 55 : 40,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    appName: {
        fontSize: 22,
        fontWeight: "900",
        color: "#fff",
        letterSpacing: 0.5,
    },
    appNameAccent: {
        color: "#A5B4FC",
    },
    logoutBtn: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },

    // PROFILE CARD
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: -20,
        padding: 24,
        alignItems: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 12,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "#4F46E5",
    },
    avatarPlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarInitial: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
    },
    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    cameraEmoji: {
        fontSize: 14,
    },
    profileInfo: {
        alignItems: "center",
        marginTop: 4,
    },
    profileEmail: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 6,
    },
    rolBadge: {
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    rolText: {
        color: "#4F46E5",
        fontWeight: "700",
        fontSize: 12,
        textTransform: "capitalize",
    },
    changePhotoBtn: {
        marginTop: 14,
        borderWidth: 1,
        borderColor: "#C7D2FE",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 7,
    },
    changePhotoText: {
        color: "#4F46E5",
        fontSize: 13,
        fontWeight: "600",
    },

    // STATS
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    statIcon: {
        fontSize: 22,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
        textAlign: "center",
    },

    // MENU
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 12,
    },
    menuGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
        gap: 12,
    },
    menuCard: {
        width: "47%",
        borderRadius: 16,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    menuIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 2,
    },
    menuSub: {
        fontSize: 12,
        color: "#94A3B8",
    },
});

export default DashboardScreen;