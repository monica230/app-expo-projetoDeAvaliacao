import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProdListScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon style={styles.icon} name="archive" size={30} color="#000069" />
                <Text style={styles.header}>Estoque</Text>
            </View>

            <Text>Qual item você deseja?</Text>
            <TextInput style={styles.button}
                placeholder="Digite o nome do produto ou loja" />
        </View>



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        marginLeft: 10,
        color: "#000069",
        fontSize: 30,
        fontWeight: "bold",
        padding:15,
    },
    button:{

    }
    })