import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";
import AddUser from "../screens/AddUser";
import ProdListScreen from "../screens/ProdListScreen";

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
            <Stack.Screen name="Adicionar Usuário" component={AddUser}
            />
            <Stack.Screen name="Tela de Listagem de Produtos" component={ProdListScreen}/>
        </Stack.Navigator>
    )
}