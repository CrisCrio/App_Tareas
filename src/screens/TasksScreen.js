import React, { useEffect, useState, useContext } from "react";
import {
    View, Text, FlatList, StyleSheet, ActivityIndicator,
    Alert, TouchableOpacity, Platform
} from "react-native";
import { getTasksService, taskApiService } from "../api/apiService";
import { AuthContext } from "../context/authContext";

const TasksScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userToken } = useContext(AuthContext);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const response = await getTasksService(userToken);
            if (response && response.datos) {
                setTasks(response.datos);
            } else if (Array.isArray(response)) {
                setTasks(response);
            } else {
                setTasks([]);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las tareas");
        } finally {
            setLoading(false);
        }
    };

    // Recargar al volver a esta pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (userToken) loadTasks();
        });
        return unsubscribe;
    }, [navigation, userToken]);

    const handleDelete = (id) => {
        Alert.alert(
            "Eliminar tarea",
            "¿Estás seguro de que quieres eliminar esta tarea?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await taskApiService.delete(userToken, id);
                            setTasks((prev) => prev.filter((t) => t.id !== id));
                        } catch {
                            Alert.alert("Error", "No se pudo eliminar la tarea.");
                        }
                    },
                },
            ]
        );
    };

    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.titulo}</Text>
                {item.descripcion ? (
                    <Text style={styles.taskDesc}>{item.descripcion}</Text>
                ) : null}
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate("TaskForm", { task: item })}
                >
                    <Text style={styles.editBtnText}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteBtnText}>🗑 Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mis Tareas</Text>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate("TaskForm", { task: null })}
                >
                    <Text style={styles.addBtnText}>+ Nueva</Text>
                </TouchableOpacity>
            </View>

            {/* CONTENT */}
            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            ) : tasks.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyTitle}>Sin tareas aún</Text>
                    <Text style={styles.emptyText}>Crea tu primera tarea con el botón + Nueva</Text>
                    <TouchableOpacity
                        style={styles.createFirstBtn}
                        onPress={() => navigation.navigate("TaskForm", { task: null })}
                    >
                        <Text style={styles.createFirstText}>Crear tarea</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTask}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    // HEADER
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
    backText: {
        color: "#A5B4FC",
        fontSize: 14,
        fontWeight: "600",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
    },
    addBtn: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        width: 70,
        alignItems: "center",
    },
    addBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },

    // LIST
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    taskCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },
    taskContent: {
        marginBottom: 12,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
    },
    taskDesc: {
        fontSize: 14,
        color: "#64748B",
        lineHeight: 20,
    },
    taskActions: {
        flexDirection: "row",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12,
    },
    editBtn: {
        flex: 1,
        backgroundColor: "#EEF2FF",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },
    editBtnText: {
        color: "#4F46E5",
        fontWeight: "600",
        fontSize: 13,
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: "#FEF2F2",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },
    deleteBtnText: {
        color: "#EF4444",
        fontWeight: "600",
        fontSize: 13,
    },

    // EMPTY / LOADING
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    emptyIcon: { fontSize: 50, marginBottom: 12 },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: "#94A3B8",
        textAlign: "center",
        marginBottom: 24,
    },
    createFirstBtn: {
        backgroundColor: "#4F46E5",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 14,
    },
    createFirstText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});

export default TasksScreen;