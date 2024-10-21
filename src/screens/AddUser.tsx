import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
export default function AddUser() {
    return (

        <SafeAreaView>
            <View>
                <Text>Usuários</Text>
            </View>

            <Icon name="motorcycle" size={30} color="#ccc" />

            <Icon name="boutique"size={30} color="#ccc" />
        </SafeAreaView>
    )
}