import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";
import AddUser from "../screens/AddUser";
import ProdListScreen from "../screens/ProdListScreen";
import AddMovements from "../screens/Addmovements"
import { useAuth } from "../contexts/AuthContext";
import AddMovementDriver from "../screens/AddMovementDriver"
import NewMovement from "../screens/NewMovement";

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    const { user } = useAuth();

    if (user) {
        console.log(user.profile);
    }


    return (
        /*  rotas autenticadas */
        user?.profile === "admin" ? (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Usuario" component={Usuario}/>

                <Stack.Screen name="Adicionar Usuário" component={AddUser}/>

                <Stack.Screen name="ProdListScreen" component={ProdListScreen}/>

                
                            
            </Stack.Navigator>
        ) : 
        user?.profile === "filial" ? (
            <Stack.Navigator>
                <Stack.Screen 
                name="Addmovements" 
                component={AddMovements}
                options={{
                    headerShown: false
                }}/>

                <Stack.Screen 
                name="Nova Movimentação" 
                component={NewMovement}
                />
            </Stack.Navigator>
        ) :
        (
            <Stack.Navigator>
                <Stack.Screen 
                name="AddMovementDriver" 
                component={AddMovementDriver}
                options={{
                    headerShown: false
                }}
                />
            </Stack.Navigator>
        )

    )
}