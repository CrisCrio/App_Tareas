import React, {useEffect, useState, useContext} from "react";
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button} from "react-native";
import {getTasksService} from "../api/apiService";
import {AuthContext} from "../context/authContext";

const TasksScreen = ({navigation}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {userToken, logout} = useContext(AuthContext);
    
    const loadTasks = async () => {
        try {
            const response = await getTasksService(userToken);
            console.log("Estructura recibida:", response);

            if (response && response.datos) {
                setTasks(response.datos);
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.error("Error al cargar tareas:", error);
            Alert.alert("Error", "No se pudieron cargar las tareas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userToken) {
            loadTasks();
        }
    }, [userToken]);

    const renderTask = ({item}) => (
        <View style={styles.tasksCard}>
            <Text style={styles.tasksTitle}>{item.title}</Text>
            <Text style={styles.tasksDesc}>{item.description}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Mis Tareas</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTask}
                contentContainerStyle={{paddingBottom: 20}}
            />
            <Button title="Cerrar Sesión" onPress={logout} color="#ff0000"/>
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    tasksCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tasksTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    tasksDesc: {
        fontSize: 14,
        color: "#666",
    }
});

export default TasksScreen;