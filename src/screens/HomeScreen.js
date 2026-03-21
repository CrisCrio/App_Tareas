import React, {useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {AuthContext} from "../context/authContext";

const HomeScreen = ({navigation}) => {
    const {logout} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style = {styles.welcome}>
                    Hola desarrollador
                </Text>
                <Text style = {styles.sub}>
                    Bienvenido al panel principal
                </Text>
            </View>

            <View style={styles.menuGrid} >
                <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("Tasks")}>
                    <Text style={styles.cardIcon}>📋</Text>
                    <Text style={styles.cardText}>Gestionar tareas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={logout}>
                    <Text style={styles.cardIcon}>🚪</Text>
                    <Text style={styles.cardText}>Cerrar sesión</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcome:{
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 40,
        textAlign: "center"
    },
    sub:{
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        textAlign: "center"
    },
    menuGrid:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30
    },
    card:{
        width: "40%",
        height: 150,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    cardIcon:{
        fontSize: 40,
        marginBottom: 10
    },
    cardText:{
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default HomeScreen;