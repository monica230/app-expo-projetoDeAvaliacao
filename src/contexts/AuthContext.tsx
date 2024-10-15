import { createContext, useContext, useState } from 'react';
import { storeData } from '../services/storage';
import axios from 'axios';

interface AuthContextData {

}

type User = {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    function signIn(email: any, password: any) {

        setLoading(true);

        axios.post('http://192.168.0.8/login', {
            email: email,
            passord: password
        })
            .then(function (response) {
                setUser(response.data);
                storeData('@user', response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                alert("Erro ao fazer login");
                setLoading(false);
            });
    }

    function signOut() {
        setUser(null);
        storeData('@user', null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

//hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}