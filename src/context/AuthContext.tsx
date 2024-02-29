import React, { useEffect } from "react";
import { PropsWithChildren, createContext, useState } from "react";
// import { userTokenData } from "../components/SignIn";
// import { User } from "../hooks/useUser";

export interface User {
    id: string;
    name?: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;

}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => undefined
});

export const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const signedUser = localStorage.getItem("user");
        if (signedUser) {
            setUser(JSON.parse(signedUser));
        }

    }, []);


    return (
        <>
            <AuthContext.Provider value={{ user, setUser }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            "useAuthContext must be used within a AuthProvider"
        );
    }
    return context;
};