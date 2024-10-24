import { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProdListScreen() {
    const [products, setProducts] = useState([

        {
            product_name: "Paracetamol",
            quantity: 99,
            image_url: "https://drogariasp.vteximg.com.br/arquivos/ids/759950-1000-1000/10227---paracetamol-750mg-20-comprimidos-generico-1.jpg?v=637980224448970000",
            description: "Analgésico e antipirético indicado para alívio da dor e febre.",
            branch_name: "Farmácia Saúde SP",
            location: "São Paulo",
            latitude: -23.55052,
            longitude: -46.633308

        },

        {
            product_name: "Dipirona",
            quantity: 45,
            image_url: "https://www.drogariaminasbrasil.com.br/media/product/9e6/dipirona-monoidratada-1g-com-10-comprimidos-generico-prati-donaduzzi-ed2.jpg",
            branch_name: "Farmácia Droga Raia SP",
            location: "São Paulo",
            latitude: -23.55052,
            longitude: -46.633308

        },
        {
            product_name: "Dipirona",
            quantity: 45,
            image_url: "https://www.drogariaminasbrasil.com.br/media/product/9e6/dipirona-monoidratada-1g-com-10-comprimidos-generico-prati-donaduzzi-ed2.jpg",
            branch_name: "Farmácia Droga Raia SP",
            location: "São Paulo",
            latitude: -23.55052,
            longitude: -46.633308

        }

    ])
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="archive" size={30} color="#000069" />
                <Text style={styles.header}>Estoque</Text>
            </View>

            <Text style={styles.containerbutton}>Qual item você deseja?</Text>
            <TextInput style={styles.button}
                placeholder="Digite o nome do produto ou loja" />

            <FlatList
                data={products}
                keyExtractor={(item) => item.product_name}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item.product_name}</Text>
                        <View>
                            <Image style={styles.img} source={{ uri: item.image_url }} />
                        </View>
                        <Text>{item.description}</Text>
                    </View>

                }


            />

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
        padding: 15,
    },
    button: {
        borderColor: "#ccc",
        borderWidth: 2,
        height: 50,
        borderRadius: 7,
        letterSpacing: 2,
        padding: 15,
    },
    containerbutton: {
        fontSize: 15,
        fontWeight: "bold",
        padding: 8,
    },
    img: {
        width: 100,
        height: 100,
    }
})