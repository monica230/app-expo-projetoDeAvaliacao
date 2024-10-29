import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function Home() {
    return (
        <View>
            <StatusBar style="auto" />
            
            <Text>Welcome to the Home screen!</Text>
        </View>
    );
}