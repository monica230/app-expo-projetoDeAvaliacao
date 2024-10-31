import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image, Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from 'axios';

interface IProducts {
    product_name: string
    quantity: number;
    image_url: string;
    description: string;
    branch_name: string;
    location: string;
    latitude: number;
    longitude: number;
}

export default function ProdListScreen() {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [search, setSearch] = useState<string>("")
    const [productsFiltered, setProductsFiltered] = useState<IProducts[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pesquisarPor, setPesquisarPor] = useState("");

    function getProducts() {
        setIsLoading(true)

        axios.get("http://192.168.0.7:3000/products")
            .then((response) => {
                setProducts(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                Alert.alert("Error", "Não foi possível encontrar produtos")
            })

    }


    useEffect(() => {
        getProducts()
    }, []);

    useEffect(() => {
        if (search === '') {
            setProductsFiltered(products)
        }
        else if (pesquisarPor === 'product') {
            setProductsFiltered(products.filter((product) => product.product_name.toLowerCase().includes(search.toLowerCase())))
        }
        else {
            setProductsFiltered(products.filter((product) => product.branch_name.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Feather name="archive" size={30} color="#000069" />
                <Text style={styles.header}>Estoque</Text>
            </View>

            <Text style={styles.containerButton}>Qual item você deseja?</Text>
            <TextInput value={search} onChangeText={setSearch}
                style={styles.button}
                placeholder="Digite o nome do produto ou loja"
            />

            <View style={styles.buttonproducts}>
                <TouchableOpacity onPress={() => setPesquisarPor('product')} style={styles.Opacity}>
                    <Text style={[styles.text, { color: pesquisarPor === 'product' ? '#ffd700' : '#ccc' }]}>Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPesquisarPor('branch_name')} style={styles.Opacity}>
                    <Text style={[styles.text, { color: pesquisarPor === 'branch_name' ? '#ffd700' : '#ccc' }]}>Lojas</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                data={productsFiltered}
                keyExtractor={(item) => item.product_name}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.containertext}>{item.product_name}</Text>
                        <Image style={styles.img} source={{ uri: item.image_url }} />
                        <Text style={styles.description}>{item.description}</Text>
                        <Text>{item.branch_name}</Text>
                    </View>
                )}
            />
        </View>
    );
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
        borderWidth: 2,
        height: 50,
        borderRadius: 7,
        letterSpacing: 2,
        padding: 15,
    },
    containerButton: {
        fontSize: 15,
        padding: 8,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 8,

    },
    buttonproducts: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,

    },
    text: {
        fontSize: 20,
        color: "#ffd700",

    },
    Opacity: {
        backgroundColor: "#000069",
        padding: 10,
        width: 110,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        justifyContent: "center",
        borderRadius: 40,
        padding: 30,
        marginBottom: 20,
        width: 260,
        height: 300,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#aaa",
        backgroundColor: "#FAFAFA"
    },
    containertext: {
        alignItems: "center",
        padding: 8,
    },
    description: {
        padding: 8,
    }
});
