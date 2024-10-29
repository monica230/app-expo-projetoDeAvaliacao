import axios from "axios";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, SafeAreaView, StyleSheet, FlatList, Switch } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

type User = {
    id: number;
    profile: string;
    name: string;
    document: string;
    full_address: string;
    email: string;
    password: string;
    status: number;
}

export default function Usuario({ navigation }: any) {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const [users, setUsers] = useState<User[]>([])

    function handleNavigateToAddUser() {
        navigation.navigate("Adicionar Usuário")
    }

    function handleChangeSwitch(item: User) {
        axios.patch(`http://192.168.0.7:3000/users/${item.id}/toggle-status`)
            .then(() => {
                alert("Status atualizado.")
            })
            .catch((error) => {
                console.error(error)
                alert("Erro ao atualizar status.")
            })
    }

    useEffect(() => {
        function pegarUsuarios() {
            axios.get("http://192.168.0.7:3000/users")
                .then((response) => {
                    setUsers(response.data)
                    console.log(users)
                })
                .catch((error) => {
                    console.error(error)
                    alert("Erro ao encontrar usuários.")
                })
        }

        pegarUsuarios()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Usuários</Text>
            </View>

            <View style={styles.button}>
                <TouchableOpacity onPress={handleNavigateToAddUser }>
                    <Text style={styles.buttonText}>Novo Usuário</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.areaswitch}>
                            <Icon name="motorcycle" size={30} color="#ccc" />
                            <Switch
                                value={isEnabled}
                                onValueChange={() => handleChangeSwitch(item)}
                                trackColor={{ false: "#767577", true: "#ccc" }}
                                thumbColor={isEnabled ? "#000069" : "#f4f3f4"}
                            />
                        </View>
                        <Text style={styles.userName}>{item?.name}</Text>
                        <Text style={styles.userProfile}>{item?.profile}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000069",
    },
    button: {
        backgroundColor: "#000069",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
        width: "50%",
        alignSelf: "baseline",
        marginLeft: 10,
    },
    buttonText: {
        color: "#ffd700",
        fontSize: 20,
    },
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        width: 200,
        margin: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555"
    },
    userProfile: {
        fontSize: 14,
        color: "#555",
    },
    areaswitch: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 150,
        padding: 10,
    }
});
