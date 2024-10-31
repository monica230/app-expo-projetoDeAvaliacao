import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function MovementsListScreen({navigation} : any) {

    const [movements, setMovements] = useState([
        
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
                renderItem={(item) => {
                    <View style={styles.card}>
                        <Text style={styles.label}><Text style={styles.bold}>Origem:</Text> {item.origem}</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Destino:</Text> {item.destino}</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Produto:</Text> {item.produto}</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Status:</Text> {item.status}</Text>
                    </View>
                }}
                
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

