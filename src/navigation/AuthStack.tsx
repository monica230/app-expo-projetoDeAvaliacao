import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";
import AddUser from "../screens/AddUser";
import ProdListScreen from "../screens/ProdListScreen";
import AddMovements from "../screens/Addmovements"
import { useAuth } from "../contexts/AuthContext";
import AddMovementDriver from "../screens/AddMovementDriver"

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    const { user }: any  = useAuth();

    const [ profile, setProfile ] = useState('')

    if(user.profile === "admin") {
        setProfile("Home")
    }
    else if(user.profile === "filial") {
        setProfile("Addmovements")
    }
    else{
        setProfile("AddMovementDriver")
    }


    return (
        /*  rotas autenticadas */
        <Stack.Navigator initialRouteName={profile}>
            <Stack.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Usuario" component={Usuario}
            />
            <Stack.Screen name="Adicionar Usuário" component={AddUser}
            />
            <Stack.Screen name="ProdListScreen" component={ProdListScreen}/>

            <Stack.Screen name="Addmovements" component={AddMovements}/>
            
            <Stack.Screen name="AddMovementDriver" component={AddMovementDriver}/>
            

        </Stack.Navigator>

    )
}