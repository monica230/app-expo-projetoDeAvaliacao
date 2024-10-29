import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

export default function Header() {
    return (

        <View style={styles.container}>
            <Image style={styles.img} source={require("../../assets/imgfar.png")} />
            <View>
                <Text style={styles.text}>Olá, Usúario!</Text>
            </View>
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 25,
        backgroundColor:"#fff",
    },
    img: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 20,
    }

})
