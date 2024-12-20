import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
    function handleNavigateToUser() {
        navigation.navigate("Usuario")
    }

    function handleNavigateToStock() {
        navigation.navigate("ProdListScreen")
    }

        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <View>

                    <TouchableOpacity onPress={handleNavigateToStock} style={styles.button}>
                        <Feather name="archive" size={30} color="#ccc" />
                        <Text style={styles.text}>Estoque</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleNavigateToUser} style={styles.button}>
                        <Feather name="user" size={30} color="#ccc" />
                        <Text style={styles.text}>Usuário</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }


    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#000069",
            paddingHorizontal: 10,
            paddingVertical: 12,
            margin: 40,
            height: 67,
            borderColor: "gray",
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: "center"
        },
        text: {
            color: "#ffd700",
            fontSize: 18,
            textAlign: 'center',
            fontWeight: "bold",
            letterSpacing: 2,
        },
        container: {
            flex: 1,
            backgroundColor: "#fff"
        }
    });