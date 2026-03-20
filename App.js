import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Activity } from 'react';
import { AuthProvider } from "./src/context/authContext";
import LoginScreen from "./src/screens/LoginScreens";

// componente interno para manejar la logica de carga
// dentro de rootNavigator en App.js
const RootNavigator = () => {
  const { userToken, isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // LOGICA DE NAVEGACION: Si hay token, muestra tareas, sino login
  // Si existe userToken, mostramios la pantalla de tareas.
  // Si no, mostramos la pantalla de login.
  return userToken ? <TasksScreen /> : <LoginScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
