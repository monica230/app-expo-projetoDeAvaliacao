import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type Filial = {
    id: number;
    latitude: number;
    longitude: number;
    location: string;
    name: string;
}

type Produto = {
    branch_id: number;
    branch_name: string;
    product_name: string;
    product_id: number;
    quantity: number;
}


export default function NewMovement({ navigation }: any) {

    const [ filiais, setFiliais ] = useState<Filial[]>([]);
    const [ produtos, setProdutos ] = useState<Produto[]>([])

    const [ destino, setDestino ] = useState('');
    const [ origem, setOrigem ] = useState('');
    const [ produto, setProduto ] = useState('');
    const [ quantidade, setQuantidade ] = useState('');
    const [ observacao, setObservacao ] = useState('');

    useEffect(() => {

        function getFiliais() {

            // Lógica para buscar as filiais
            axios.get('http://192.168.0.212:3000/branches/options')
            .then((response) => {
                 setFiliais (response.data);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error","Erro ao buscar filiais");
            });
        }

        getFiliais();

    }, []);

    useEffect(() => {

       function getProdutos() {
            // Lógica para buscar as produtos
            axios.get('http://192.168.0.212:3000/products/options')
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error","Erro ao buscar produtos");
            });
        }

        getProdutos();
        
    }, []);

    function handleSaveMovement() {
        if(origem === destino) {
            Alert.alert("Atenção", "A filial de origem não pode ser a mesma da filial de destino");
            return;
        }
       
        //selecionando o produto e a filial desejada
        const product = produtos.find((product) => 
            product.branch_id === Number(origem) &&
            product.product_id === Number(produto)
        );

        //verificando se o produto esta disponivel na filial
        if(!product) {
            Alert.alert("Atenção", "Produto não esta disponivel nesta filial");
            return;
        }

        //verificando se a quantidade desejada é maior que a quantidade disponivel
        if(Number(quantidade) > product.quantity) {
            Alert.alert("Atenção", "A quantidade excede a quantidade disponivel");
            return;
        }

        axios.post('http://192.168.0.212:3000/movements', {
            originBranchId: origem,
            destinationBranchId: destino,
            productId: produto,
            quantity: quantidade,
        })
        .then((response) => {
            console.log(">>> POST /movements" + response.data);
            Alert.alert("Sucesso","Movimentação cadastrada com sucesso");
            setOrigem('');
            setDestino('');
            setProduto('');
            setQuantidade('');
            setObservacao('');

            navigation.navigate('Addmovements');

        })
        .catch((error) => {
            console.error(error);
            Alert.alert("Error","Erro ao cadastrar movimentação");
        });
    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>Filial origem</Text>
                <View style={ styles.selectContainer}>
                    <Picker
                    selectedValue={origem}
                    onValueChange={(itemValue, itemIndex) =>
                        setOrigem(itemValue)
                      }
                    style={ styles.picker}
                    >
                        <Picker.Item 
                        label="Selecione uma opção" value="" />
                        {filiais.map((filial) => ( 
                            <Picker.Item 
                                key={filial.id} 
                                label={filial.name} 
                                value={filial.id} 
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={ styles.formGroup }>
                <Text style={ styles.label }>Filial destino</Text>
                <View style={ styles.selectContainer}>
                    <Picker
                     selectedValue={destino}
                     onValueChange={(itemValue, itemIndex) =>
                         setDestino(itemValue)
                       }
                     style={ styles.picker}
                    >
                        <Picker.Item 
                        label="Selecione uma opção" value="" />
                        {filiais.map((branch) => ( 
                            <Picker.Item 
                                key={branch.id} 
                                label={branch.name} 
                                value={branch.id} 
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={ styles.formGroup }>
                    <Text style={ styles.label}>
                        Produto desejado
                    </Text>

                    <View style={ styles.selectContainer}>
                        <Picker
                        selectedValue={produto}
                        onValueChange={(itemValue, itemIndex) =>
                            setProduto(itemValue)
                          }
                        style={ styles.picker}
                        >
                            <Picker.Item 
                            label="Selecione uma opção" value="" />
                                {produtos.map((product) => ( 
                                    <Picker.Item 
                                        key={product.product_id} 
                                        label={product.product_name} 
                                        value={product.product_id} 
                                    />
                                ))}
                        </Picker>
                    </View>
                </View>

                <View style={ styles.formGroup }>
                    <Text style={ styles.label}>Quantidade</Text>
                    <TextInput
                        style={ styles.input }
                        placeholder="0"
                        keyboardType='numeric'
                        returnKeyType="next"
                        onChangeText={value => setQuantidade(value)}
                        value={quantidade}
                    />
                </View>

                <View style={ styles.formGroup}>
                    <Text style={ styles.label}>Observação</Text>
                    <TextInput
                        style={ styles.input}
                        placeholder="digite uma observação"
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={4}
                        returnKeyType="done"
                        onChangeText={value => setObservacao(value)}
                        value={observacao}
                    />
                </View>

                 <View style={ styles.formGroup}>
                    <TouchableOpacity 
                    style={ styles.button }
                    onPress={() => handleSaveMovement()}
                    >
                        <Text style={ styles.buttonText }>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: '#000069',
        marginBottom: 5,
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#000069',
        borderRadius: 5,
        marginBottom: 15,
    },
    formGroup: {
        marginBottom: 10,
    },
    picker: {
        height: 40,
        color: '#000069',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000069',
        borderRadius: 10,
        padding: 10,
        color: '#000069',
    },
    button : {
        backgroundColor: '#000069',
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffd700',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    }
});