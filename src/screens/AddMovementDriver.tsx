import { useState } from "react"
import 
{ View, Text, SafeAreaView, FlatList, Image, StyleSheet, TouchableOpacity } 
from "react-native"
import Header from "../components/Header"


type Movimentacao = {
    id: number,
    produto: {
        nome: string,
        imagem: string
    },
    quantidade: number,
    status: string,
    origem: {
        nome: string,
        latitude: number,
        longitude: number
    },
    destino: {
        nome: string,
        latitude: number,
        longitude: number
    },
    dataCriacao: string,
    historico: {
        id: number,
        descricao: string,
        data: string,
        file: string
    }[]
}

export default function AddMovementDriver(){
    
    const [ movimentacoes, setMovimentacoes ] = useState<Movimentacao[]>([
        {
            "id": 1,
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
            "dataCriacao": "2024-11-01T19:54:38.653Z",
            "historico": [
                {
                    "id": 1,
                    "descricao": "created",
                    "data": "2024-11-01 19:54:38",
                    "file": "http://localhost:3000/null"
                }
            ]
        }
    ])

    return (
        <SafeAreaView>
            <Header/>

            <FlatList
                style={ styles.container }
                data={movimentacoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View>
                        <View style={ styles.areaProduto }>
                            <Image 
                                source={{uri: item.produto.imagem}}
                                style={{width: 100, height: 100}}
                            />

                            <View style={ styles.areaTitle }>
                                <Text style={ styles.title }>
                                    {item.produto.nome}
                                </Text>
                                <Text>
                                    {item.quantidade} unid.(s)
                                </Text>
                                <Text>
                                    Ordem: {item.id}
                                </Text>
                            </View>
                        </View>

                        <View>
                            {/* bara de status */}
                        </View>

                        <View>
                            <Text>{item.origem.nome}</Text>
                            <Text>{item.destino.nome}</Text>
                            {Array.isArray(item.historico) && item.historico.map((historicoItem, index) => {
                                return (
                                    <View key={index} style={ styles.destination }>
                                        <Text>
                                            {
                                            historicoItem.descricao === "created" ?
                                            "Aguardando coleta" :  historicoItem.descricao
                                            }
                                        </Text>

                                        <Text>
                                            {new Date(historicoItem.data)
                                            .toLocaleString('pt-BR')}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        <View style={ styles.areaButton }>
                            <TouchableOpacity style={ styles.button }> 
                                <Text 
                                style={ styles.textButton }>
                                    Iniciar Entrega
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={ styles.button }>
                                <Text 
                                style={ styles.textButton }>
                                    Mapa
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin:20,
        backgroundColor: '#FFF',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 10,
    },
    areaProduto: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    },
    areaTitle: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    destination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    areaButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#000069',
        padding: 10,
        borderRadius: 10,
        width: 130,
        alignItems: 'center',
    },
    textButton: {
        color: '#ffd700',
        fontWeight: 'bold',
    },

})