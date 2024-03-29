import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/AuthContext";


export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem, removeItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    }

    const removeUser = () => {
        setUser(null);
        // setItem("user", "");
        removeItem("user");
    }

    return { user, addUser, removeUser };
}