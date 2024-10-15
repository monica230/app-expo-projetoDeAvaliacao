import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    SafeAreaView, StyleSheet, TextInput,
    TouchableOpacity, View, Text, Image
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {

    const { signIn }: any = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        //validacao
        if (email === "" || password === "") {
            alert("Preencha todos os campos!");
            return;
        }

        alert("Email: " + email + " Senha: " + password);

        signIn(email, password);

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <Image
                source={require("../../assets/imgfar.png")}
                style={styles.image}
            />

            <View style={styles.areaTitle}>
                <Text style={styles.title}>
                    Login
                </Text>
            </View>

            <TextInput
                value={email}
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                value={password}
                placeholder="Senha"
                placeholderTextColor="#888"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />

            <View>
                <TouchableOpacity
                    style={styles.areaButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 16,
        borderRadius: 50,
    },
    areaTitle: {
        alignItems: "center",

    },
    title: {
        fontSize: 34,
        marginBottom: 12,
        color: " #333",
    },
    input: {
        height: 46,
        borderColor: "gray",
        paddingVertical: 12,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginVertical: 16,
        fontSize: 16,
    },
    areaButton: {
        backgroundColor: "#000069",
        padding: 10,
        alignItems: "center",
        marginTop: 36,
        borderRadius: 8,

    },
    textButton: {
        color: "#ffd700",
        fontSize: 18,
        fontWeight: "bold",

    },
});