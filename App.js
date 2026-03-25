import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext, AuthProvider } from "./src/context/authContext";
import LoginScreen     from "./src/screens/LoginScreen";
import HomeScreen      from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TasksScreen     from "./src/screens/TasksScreen";
import TaskFormScreen from "./src/screens/Taskformscreen";
import AprendicesScreen from "./src/screens/AprendicesScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {!userToken ? (
                    // ✅ Sin token → solo Login
                    <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                    // ✅ Con token → pantallas autenticadas
                    <>
                        <Stack.Screen name="Home"      component={HomeScreen} />
                        <Stack.Screen name="Dashboard" component={DashboardScreen} />
                        <Stack.Screen name="Tasks"     component={TasksScreen} />
                        <Stack.Screen name="TaskForm"  component={TaskFormScreen} />
                        <Stack.Screen name="Aprendices" component={AprendicesScreen} />
                    </>
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
    },
});
