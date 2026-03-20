import React, {useState, useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { AuthContext } from "../context/authContext";

const HomeScreen = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>
                    Hola desarrollador
                </Text>
                <Text style={styles.sub}>
                    Bienvenido al panel principal
                </Text>
            </View>

            <View style={styles.menuGrid}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Tasks")}>
                    <Text style={styles.cardIcono}>📝</Text>
                    <Text style={styles.cardText}>Gestionar tareas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={logout}>
                    <Text style={styles.cardIcono}>🚪</Text>
                    <Text style={styles.cardText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    header:{
        marginTop: 60,
        marginBottom: 30,
    },
    welcome:{
        fontSize: 28,
        fontWeight: "bold",
        color: '#333'
    },
    sub:{
        fontSize: 18,
        color: "#666",
    },
    menuGrid:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card:{
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    cardIcono:{
        fontSize: 40,
        marginBottom: 10,
    },
    cardText:{
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default HomeScreen;