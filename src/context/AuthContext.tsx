import React, { useEffect } from "react";
import { PropsWithChildren, createContext, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
// import { userTokenData } from "../components/SignIn";
// import { User } from "../hooks/useUser";

export interface User {
    id: string;
    userName?: string;
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
    const nevigate = useNavigate();

    useEffect(() => {
        const signedUser = localStorage.getItem("user");
        if (signedUser) {
            const signedUserObject = JSON.parse(signedUser);
            setUser(signedUserObject);
            axiosInstance.defaults.headers["x-access-token"] = signedUserObject.accessToken;
            // nevigate("/mainroot");
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