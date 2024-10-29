import React from "react";
import AuthStack from "./AuthStack";
import RootStack from "./RootStack";
import { useAuth } from "../contexts/AuthContext";


export default function RouteStack() {

    let { user }: any = useAuth();
    user=true

    return (
        <>
            {
                user
                    ?
                    <AuthStack />
                    :
                    <RootStack />
            }
        </>
    )
}