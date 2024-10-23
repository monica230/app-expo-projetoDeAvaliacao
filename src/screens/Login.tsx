import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/Login"; 
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, TextInput } from "react-native"; 

const Stack = createNativeStackNavigator();

export default function Login() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function LoginScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor="#888"
                style={styles.input}
                secureTextEntry={true} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});