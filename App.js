import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
// Verifica que estas 3 rutas tengan el "./src/..."
import { AuthContext, AuthProvider } from "./src/context/authContext";
import LoginScreen from "./src/screens/LoginScreen"; // OJO: Si están en src/screens
import TasksScreen from "./src/screens/TasksScreen";

// Componente intermedio para manejar la logica de carga
// Dentro de tu RootNavigator en App.js

const RootNavigator = () => {
    const {userToken, isLoading} = useContext(AuthContext);

    if(isLoading){
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    }

    //logica de Navegacion
    //Si existe userToken, mostramos la pantalla de tareas.
    // si no existe, mostramos el login
    return userToken ? <TasksScreen/> : <LoginScreen/>;
};

export default function App() {
  return(
      <AuthProvider>
          <RootNavigator/>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
});