import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';


export default function MovementsListScreen({ navigation }: any) {

    interface Movement {
        id: number;
        origem: { nome: string };
        destino: { nome: string };
        produto: { nome: string };
        status: string;
    }

    const [movements, setMovements] = useState<Movement[]>([]);

    useEffect(() => {
        function getMovimentos() {
            axios.get('http://192.168.0.184:30000/movements')
                .then((response) => {
                    setMovements(response.data);
                })
                .catch((error) => {
                    console.log('Erro ao recuperar movimentos', error);
                });
        }

        getMovimentos();

    }, []);


    const handleAddMovement = () => {
        navigation.navigate('Nova Movimentação');
    };

    return (
        <View style={styles.container}>
            <Header />

            <TouchableOpacity style={styles.button} onPress={handleAddMovement}>
                <Text style={styles.buttonText}>Adicionar Movimentação</Text>
            </TouchableOpacity>

            <FlatList
                data={movements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text style={styles.boldTitle}>
                            {item.produto.nome}
                        </Text>

                        <Text style={styles.bold}>Origem:</Text>
                        <Text style={styles.label}>{item.origem.nome}</Text>

                        <Text style={styles.bold}>Destino:</Text>
                        <Text style={styles.label}>{item.destino.nome}</Text>


                        <Text style={styles.bold}>Status:</Text> 
                        <Text style={styles.label}>{item.status}</Text>
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
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000069',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffd700',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    boldTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    label: {
        marginBottom: 5,
    },
});

