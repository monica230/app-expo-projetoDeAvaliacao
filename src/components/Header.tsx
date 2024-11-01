import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {

    const { user,  signOut } = useAuth()

    if (!user) {
        return null;
    }

    let newName = user.name;

    if (user.name === 'ADMINISTRADOR') {
       newName = 'Administrador';
    }

    return (

        <View style={styles.container}>
            <Image style={styles.img} source={require("../../assets/imgfar.png")} />
            <View>
                <Text style={styles.text}>Olá, {newName}</Text>
            </View>

            <TouchableOpacity 
            style={ styles.button}
            onPress={() => signOut()}
            >
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 25,
        backgroundColor:"#fff",
    },
    img: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 15,
    },
    button: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 10,
    },
    textButton: {
        color: "#fff",
        fontSize: 15,
    }

})
