import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, TextInput, } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import axios from "axios";


export default function NovoUsuario({ navigation }: any) {


    const [profile, setProfile] = useState('')
    const [document, setDocument] = useState('')
    const [email, setEmail] = useState('')
    const [name, setname] = useState('')
    const [endereco, setEndereco] = useState('')
    const [senha, setSenha] = useState('')
    const [confirme, setconfirme] = useState('')

    function handleNavigateToUser() {
        navigation.navigate("ProdListScreen");
    }

    function changeProfileMotorista() {
        setProfile('motorista')
    }

    function changeProfileFilial() {
        setProfile('filial')
    }

    function saveUser() {
        // validar
        console.log(profile, name, document, endereco, email, senha, confirme)
        if (profile === "" || name === "" || document === "" || endereco === "" || email === "" || senha === "" || confirme === "") {
            alert("todos os campos são obrigatorios!")
            return
        }
        if (senha !== confirme) {
            alert("Senhas não são iguais")
            return
        }

        // fazer requisição para cadastrar usuario

        axios.post('http://192.168.0.7:3000/register', {
            profile: profile,
            name: name,
            document: document,
            full_address: endereco,
            email: email,
            password: senha
        })
            .then(() => {
                console.log("DEU CERTO")
                handleNavigateToUser()
                alert("Usuário Cadastrado com Sucesso!")
            })
            .catch((error) => {
                alert("Erro ao cadastrar usuário.")
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



            <View style={styles.inputContainer}>
                <Text style={styles.space}>Nome completo</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>{profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
                <TextInput
                    style={styles.input}
                    value={document}
                    onChangeText={setDocument}
                />
            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.space}>Endereço Completo</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.space}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.space}>Senha</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.space}>Confirme a Senha</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={confirme}
                    onChangeText={setconfirme} />
            </View>



            <View style={styles.button}>
                <TouchableOpacity onPress={saveUser} >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    containerPrimary: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    containerOptions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 25,
    },
    optionProfile: {
        width: 100,
        height: 80,
        backgroundColor: "#000069",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 25,
    },
    textinput: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },

    inputContainer: {
        width: '80%',
        marginHorizontal: 'auto',
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        height: 32,
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
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
        alignSelf: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: "#ffd700",
        height: 20,
        fontWeight: "bold",
        fontSize: 15,
    },
    space:{
        letterSpacing:1.5,
    }
})