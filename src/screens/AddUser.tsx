import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, TextInput, } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import axios from "axios";

export default function NovoUsuario() {

    const [profile, setProfile] = useState('motorista')
    const [document, setDocument] = useState('')
    const [email, setEmail] = useState('')
    const [name, setname] = useState('')

    function changeProfileMotorista() {
        setProfile('motorista')
    }

    function changeProfileFilial() {
        setProfile('filial')
    }

    function saveUser() {
        // validar

        // fazer requisição para cadastrar usuario

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
            profile: profile,
            name: 'Henrique Douglas',
            document: document,
            full_address: "Rua x, bairro y",
            email: email,
            password: "123456"
        })
            .then(() => {
                console.log("DEU CERTO")

            })
            .catch(() => {

            })
    }

    return (
        <SafeAreaView>

            <View style={styles.containerOptions}>
                <TouchableOpacity style={styles.optionProfile} onPress={changeProfileMotorista}>
                    <MaterialCommunityIcons
                        name="motorbike-electric"
                        size={30}
                        color={profile === "motorista" ? "#ffd700" : "#ccc"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionProfile} onPress={changeProfileFilial}>
                    <MaterialCommunityIcons
                        name="warehouse"
                        size={30}
                        color={profile === "filial" ? "#ffd700" : "#ccc"}
                    />
                </TouchableOpacity>
            </View>


            <View >
                <View>
                    <Text>Nome completo</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setname}
                    />
                </View>

                <View>
                    <Text>{profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
                    <TextInput
                        style={styles.input}
                        value={document}
                        onChangeText={setDocument}
                    />
                </View>

                <View>
                    <Text>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <View style={styles.button}>
                <TouchableOpacity onPress={() => console.log('Botão pressionado')}>
                    <Text style={styles.buttonText}> Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    containerPrimary: {
        alignItems: "center"
    },
    containerOptions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
    },
    optionProfile: {
        width: 100,
        height: 50,
        backgroundColor: "#000069",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
  

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "70%",
        height: 32,
        marginVertical: 10,
        padding: 10,
        borderRadius:8,

    },
    button: {
        backgroundColor: "#000069",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        width: "50%",
        marginLeft: 10,
        borderColor: "#ffd700",
        borderWidth: 2,
    },
    buttonText: {
        color: "#ffd700",
        height: 20,
        fontWeight: "bold",
        fontSize: 15,
    }

})
