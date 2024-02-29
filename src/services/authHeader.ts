import { AxiosHeaderValue } from "axios";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext, useAuthContext } from "../context/AuthContext";

interface userType {
    accessToken: string;
    userName: string;
    id: string;
    refreshToken: string;
}

function authHeader(): { 'x-access-token': string } | {} {


    const userStr = localStorage.getItem("user") as string;
    let user: userType = {
        accessToken: "",
        userName: "",
        id: "",
        refreshToken: ""
    };
    if (userStr) {
        user = JSON.parse(userStr);
    }

    // const { user } = useContext(AuthContext);

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export default authHeader;