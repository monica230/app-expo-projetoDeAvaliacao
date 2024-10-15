import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import RouteStack from "./src/navigation/RouteStack";

const Stack = createNativeStackNavigator();

export default function Login() {

    const { user }: any = useAuth();

    return (
        <AuthProvider>
            <NavigationContainer>
                <RouteStack />
            </NavigationContainer>
        </AuthProvider>
    );
}