import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { storeData, getData } from '../services/storage';
import axios from 'axios';

interface AuthContextData {
    user: User | null;
    profile: Profile | null;
    signIn: (email: any, password: any) => void;
    signOut: () => void;
    loading: boolean;
}

type User = {
    [x: string]: any;
    email: string;
    password: string;
 }

 type Profile = {
    name: string;
    profile: string;
 }

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider= ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await getData('@user');
            if (storageUser) {
                setUser(storageUser);
            }
        }
        loadStorageData();
    },[]);

    function signIn(email: string, password: string) {
        console.log(email, password)

        setLoading(true);

        axios.post("http://192.168.0.212:3000/login", {
            email: `${email}`,
            password: `${password}`
        })
        .then((response) => {
            setUser(response.data);
            console.log(">>> user context: ", user)
            storeData('@user', response.data);
            setLoading(false);
        })
        .catch((error) => {
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
        <AuthContext.Provider value={{ user, profile, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

//hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}