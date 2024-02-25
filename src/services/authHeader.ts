import { AxiosHeaderValue } from "axios";

interface userType {
    accessToken: string;
    userNmae: string;
    id: string;
    refreshToken: string;
}

function authHeader(): AxiosHeaderValue {
    const userStr = localStorage.getItem("user") as string;
    let user: userType = {
        accessToken: "",
        userNmae: "",
        id: "",
        refreshToken: ""
    };
    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return { 'x-access.token': " " };
    }
}

export default authHeader;