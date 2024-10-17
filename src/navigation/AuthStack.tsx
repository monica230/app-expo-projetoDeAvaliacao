import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        /*  rotas autenticadas */
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Usuario" component={Usuario}
            />
        </Stack.Navigator>
    )
}