import { View, Text, TextInput, SafeAreaView, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header'

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <Header />
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Estoque</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Usuário</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000069",
        padding: 10,
        margin:20,
        width: 200,
        borderRadius:8,
        justifyContent:'center',
        alignItems:"center"
            },

    text: {
        color: "#ffd700",
        fontSize: 18,
        textAlign:'center',
    },
})