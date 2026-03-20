import React,{useEffect ,useState, useContext} from "react";
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert} from "react-native";
import {getTasksService} from "../api/apiService";
import {AuthContext} from "../context/authContext";
import { getTasksService } from "../api/apiService";

const TasksScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {userToken} = useContext(AuthContext);
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasksService(userToken);

                // LOG DE DEBUG: Importante para que tus aprendizajes vean que llega
                console.log("Estructura recibida:",response);

                // AQUI ESTA EL CAMBIO
                // No guardamos 'response', sinoi 'response.datos'
                if (response && response.datos) {
                    setTasks(response.datos);
                } else {
                    setTasks([]);
                }
            } catch (error){
                console.error("Error al cargar tareas:", error);
                Alert.alert("Error", "No se pudieron cargar las tareas");
            } finally{
                setLoading(false);
            }
        };
        loadTasks();
    },[]);

    const renderTaks = ({item}) => (
        <View style={StyleSheet.tasksCard}>
            <Text style={styles.tasksTitle}>{item.title}</Text>
            <Text style={styles.tasksDesc}>{item.description}</Text>
        </View>
    );

    if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}}/>;

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Mis Tareas</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTaks}
                contentContainerStyle={{paddingBottom: 20}}
            />
            <Button title="Cerrar Seción" onPress={logout} color="#ff0000"/>
        </View>
    );
};