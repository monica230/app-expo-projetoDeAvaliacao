import { useState } from "react";
import { Touchable, TouchableOpacity, View, Text, SafeAreaView, StyleSheet, FlatList, Switch } from "react-native";

export default function Usuario() {
    const [isEnabled, setIsEnabled] = useState(false)
    const [users, setUsers] = useState([
        {
            id: 1,
            profile: "admin",
            name: "ADMINISTRADOR",
            document: "999-999-999-01",
            full_address: "MATRIZ UMBRELLA",
            email: "admin@gmail.com",
            password: "123456",
            status: true,
        },
    ])
    return (

        <SafeAreaView>

            <Text>Usuarios</Text>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Text>Novo Usuário</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={users} keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Switch value={isEnabled} onValueChange={(value) => setIsEnabled(value)} trackColor={{ false: '#767577', true: '#ccc' }}
                            thumbColor={isEnabled ? '#004085' : '#f4f3f4' }/>
                        <Text>{item.name}</Text>
                        <Text>
                            {item.profile}
                        </Text>
                    </View>
                )}
            />

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000069",
    }
})