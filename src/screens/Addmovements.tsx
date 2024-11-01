import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


export default function MovementsListScreen({ navigation }: any) {

    const [movements, setMovements] = useState([
        {
            "id": 3,
            "produto": {
                "nome": "Paracetamol",
                "imagem": "https://drogariasp.vteximg.com.br/arquivos/ids/759950-1000-1000/10227---paracetamol-750mg-20-comprimidos-generico-1.jpg?v=637980224448970000"
            },
            "quantidade": 10,
            "status": "created",
            "origem": {
                "nome": "Farmácia Saúde SP",
                "latitude": -23.55052,
                "longitude": -46.633308
            },
            "destino": {
                "nome": "Farmácia Bem-Estar CE",
                "latitude": -3.71722,
                "longitude": -38.54337
            },
            "dataCriacao": "2024-10-27T20:48:37.963Z",
            "historico": [
                {
                    "id": 10,
                    "descricao": "created",
                    "data": "2024-10-27 20:48:37",
                    "file": "http://localhost:3000/null"
                }
            ]
        }
    ]);

    useEffect(() => {

        const fetchMovements = async () => {
            try {
                const response = await axios.get("http://192.168.0.7:3000/movements");
                setMovements(response.data);
            } catch (error) {
                console.error("Erro ao buscar movimentações:", error);
            }
        };

        fetchMovements();
    }, []);


    const handleAddMovement = () => {
        navigation.navigate('Addmovements');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Olá, Filial 10</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddMovement}>
                <Text style={styles.buttonText}>Adicionar Movimentação</Text>
            </TouchableOpacity>
            <FlatList
                data={movements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => (
                    <View style={styles.card}>
                        <Text style={styles.bold}>Origem:</Text>
                        <Text style={styles.label}>{item.origem}</Text>

                        <Text style={styles.bold}>Destino:</Text>
                        <Text style={styles.label}>{item.destino}</Text>

                        <Text style={styles.label}>
                            <Text style={styles.bold}>Produto:</Text> {item.produto}
                        </Text>

                        <Text style={styles.label}>
                            <Text style={styles.bold}>Status:</Text> {item.status}
                        </Text>
                    </View>

                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
    },
    label: {
        fontSize: 14,
        marginVertical: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
});

