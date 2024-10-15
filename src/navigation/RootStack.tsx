import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
       /*  rotas nao autenticadas */
        <Stack.Navigator>
            <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}