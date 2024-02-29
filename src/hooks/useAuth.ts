import { useEffect, useState } from "react";
// import { useUser, User } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../context/AuthContext";

export const useAuth = () => {
    // const { user, addUser, removeUser } = useUser();
    // const { getItem } = useLocalStorage();

    // const setUser = () => {

    //     useEffect(() => {
    //         const user = getItem("user");
    //         if (user) {
    //             addUser(JSON.parse(user));
    //         }
    //     }, []);
    // }

    // const login = (user: User) => {
    //     addUser(user);
    // };

    // const logout = () => {
    //     removeUser();
    // };


    const { getItem } = useLocalStorage();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const value = getItem("user");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, [])

    console.log("USER VALUE IN Auth: .....  " + user?.id)

    return { user, setUser };
};

