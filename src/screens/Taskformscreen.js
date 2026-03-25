import React, { useState, useContext } from "react";
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    ActivityIndicator, Alert, ScrollView, Platform
} from "react-native";
import { AuthContext } from "../context/authContext";
import { taskApiService } from "../api/apiService";

// Recibe `task` como parámetro de ruta: null = crear, objeto = editar
const TaskFormScreen = ({ navigation, route }) => {
    const { task } = route.params || {};
    const isEditing = !!task;

    const [titulo, setTitulo] = useState(task?.titulo || "");
    const [descripcion, setDescripcion] = useState(task?.descripcion || "");
    const [loading, setLoading] = useState(false);

    const { userToken } = useContext(AuthContext);

    const handleSubmit = async () => {
        if (!titulo.trim()) {
            Alert.alert("Campo requerido", "El título no puede estar vacío.");
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await taskApiService.update(userToken, task.id, { titulo, descripcion });
                Alert.alert("✅ Tarea actualizada", "Los cambios fueron guardados.");
            } else {
                await taskApiService.create(userToken, { titulo, descripcion });
                Alert.alert("✅ Tarea creada", "Tu nueva tarea fue guardada.");
            }
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "No se pudo guardar la tarea. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isEditing ? "Editar tarea" : "Nueva tarea"}
                </Text>
                <View style={{ width: 70 }} />
            </View>

            {/* FORM */}
            <View style={styles.formCard}>
                <Text style={styles.label}>Título <Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la tarea"
                    placeholderTextColor="#94A3B8"
                    value={titulo}
                    onChangeText={setTitulo}
                    maxLength={100}
                />
                <Text style={styles.charCount}>{titulo.length}/100</Text>

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe la tarea (opcional)"
                    placeholderTextColor="#94A3B8"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    maxLength={500}
                />
                <Text style={styles.charCount}>{descripcion.length}/500</Text>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitText}>
                        {isEditing ? "Guardar cambios" : "Crear tarea"}
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

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
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backBtn: {
        width: 70,
    },
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

    // FORM
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        margin: 20,
        padding: 24,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 8,
        marginTop: 16,
    },
    required: {
        color: "#EF4444",
    },
    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: "#1E293B",
        borderWidth: 1.5,
        borderColor: "transparent",
    },
    textArea: {
        height: 130,
        paddingTop: 12,
    },
    charCount: {
        fontSize: 11,
        color: "#94A3B8",
        textAlign: "right",
        marginTop: 4,
    },

    // BUTTONS
    submitBtn: {
        backgroundColor: "#4F46E5",
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    cancelBtn: {
        marginHorizontal: 20,
        marginTop: 12,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#CBD5E1",
    },
    cancelText: {
        color: "#64748B",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default TaskFormScreen;