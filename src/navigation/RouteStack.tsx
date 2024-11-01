import React from "react";
import AuthStack from "./AuthStack";
import RootStack from "./RootStack";
import { useAuth } from "../contexts/AuthContext";


export default function RouteStack() {

   const { user } = useAuth();

   console.log(">>> user: ", user)

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