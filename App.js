import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import { AuthContext, AuthProvider } from "./context/authContext";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TasksScreen from "./screens/TasksScreen";

const Stack = createStackNavigator();

function AppNavigator() {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userToken ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Tasks" component={TasksScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}